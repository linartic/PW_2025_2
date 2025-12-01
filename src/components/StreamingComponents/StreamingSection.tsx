import { useState, useEffect } from "react"
import FollowButton from "./FollowButton"
import ProgressBar from "./ProgressBar"
import SocialLink from "./SocialLink"
import GiftNotification from "./GiftNotification"
import { Link } from "react-router-dom"
import type { Stream, User } from "../../GlobalObjects/Objects_DataTypes"
import "./StreamingSection.css"
import { getStreamerLoyaltyLevels, type LoyaltyLevel } from "../../services/loyalty.service"
import { getUserPoints } from "../../services/points.service"
import { getCurrentUser } from "../../services/auth.service"
import * as chatService from "../../services/chat.service"

interface StreamingSectionProps {
    stream: Stream
    following: User[];
    GetUser: () => User | null
    doFollowing: (user: User) => void
    doViewersDivision: (dividendo: number, divisor: number, decimas: number) => string
}

const StreamingSection = (props: StreamingSectionProps) => {
    const [Issighting, SetIssighting] = useState<boolean>(true)
    const [loyaltyLevels, setLoyaltyLevels] = useState<LoyaltyLevel[]>([]);
    const [currentPoints, setCurrentPoints] = useState<number>(0);
    const [giftNotification, setGiftNotification] = useState<{ sender: string; gift: string } | null>(null);
    const user = props.GetUser() || getCurrentUser();


    if (!props.stream || !props.stream.user) {
        return <div className="MiddleSide d-flex justify-content-center align-items-center">
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    useEffect(() => {
        SetIssighting(true)
        if (!user) {
            return
        }
        if (props.stream.user.name == user.name) {
            SetIssighting(false)
        }
    }, [user, props.stream]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.stream?.user?.id) {
                try {
                    if (user) {
                        const levels = await getStreamerLoyaltyLevels(props.stream.user.id.toString());
                        const sortedLevels = levels.sort((a, b) => a.puntosRequeridos - b.puntosRequeridos);
                        setLoyaltyLevels(sortedLevels);
                    }

                    if (user) {
                        const pointsData = await getUserPoints();
                        const streamerId = String(props.stream.user.id);
                        const streamerPoints = pointsData.byStreamer.find(
                            p => String(p.streamerId) === streamerId
                        );
                        setCurrentPoints(streamerPoints ? streamerPoints.points : 0);
                    }
                } catch (error) {
                    console.error("Error fetching loyalty data:", error);
                }
            }
        };
        fetchData();
    }, [props.stream?.user?.id, user?.id]);

    useEffect(() => {
        if (!user || !props.stream.user.id || user.id === props.stream.user.id) return;

        const POINTS_PER_INTERVAL = 10;
        const INTERVAL_MS = 60000;

        const interval = setInterval(async () => {
            try {
                const { earnPoints } = await import('../../services/points.service');
                const response = await earnPoints({
                    streamerId: props.stream.user.id.toString(),
                    action: 'watch_time',
                    amount: POINTS_PER_INTERVAL
                });

                if (response.success) {
                    setCurrentPoints(prev => prev + response.pointsEarned);
                }
            } catch (error) {
                console.error("Error awarding watch time points:", error);
            }
        }, INTERVAL_MS);

        return () => clearInterval(interval);
    }, [user, props.stream.user.id, props.stream.user.name]);

    // Escuchar actualizaciones locales de puntos (de regalos)
    useEffect(() => {
        const handlePointsUpdate = (event: any) => {
            const { points, streamerId } = event.detail;
            if (props.stream.user.id && String(streamerId) === String(props.stream.user.id)) {
                setCurrentPoints(prev => prev + points);
            }
        };

        window.addEventListener('userPointsUpdated', handlePointsUpdate);
        return () => {
            window.removeEventListener('userPointsUpdated', handlePointsUpdate);
        };
    }, [props.stream.user.id, user]);

    // Escuchar eventos de regalos desde WebSocket
    useEffect(() => {
        const unsubscribe = chatService.onGiftReceived((giftData) => {
            // Solo mostrar notificación si soy el streamer
            if (user && String(user.id) === String(props.stream.user.id)) {
                setGiftNotification({
                    sender: giftData.senderName,
                    gift: giftData.giftName
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user, props.stream.user.id]);

    const isFollowing = () => {
        let following = false
        for (let i = 0; i < props.following.length; i++) {
            if (props.following[i].id == props.stream.user.id) {
                following = true;
            }
        }
        return following
    }

    // Calcular progreso
    const getViewerProgress = () => {
        if (!user) return { current: 0, max: 100, topic: "puntos" };

        // Usar puntos obtenidos
        const points = currentPoints;

        if (loyaltyLevels.length === 0) return { current: points, max: 100, topic: "puntos" };

        // Encontrar nivel actual y siguiente
        let currentLvl = null;
        let nextLvl = null;

        for (let i = 0; i < loyaltyLevels.length; i++) {
            if (points >= loyaltyLevels[i].puntosRequeridos) {
                currentLvl = loyaltyLevels[i];
            } else {
                nextLvl = loyaltyLevels[i];
                break;
            }
        }

        // Si no hay siguiente nivel, estamos en el máximo
        if (!nextLvl) {
            return {
                current: points,
                max: points,
                topic: `puntos (Nivel Máximo: ${currentLvl?.nombre || 'Leyenda'})`
            };
        }

        return {
            current: points,
            max: nextLvl.puntosRequeridos,
            topic: `puntos para ${nextLvl.nombre}`
        };
    };

    const progress = getViewerProgress();

    // Fallback: Verificar localStorage para iframeUrl si falta en props (solo para el streamer)
    const iframeUrl = (props.stream as any).iframeUrl ||
        (user && props.stream.user.id === user.id ? localStorage.getItem('stream_iframe_url') : null);

    return (
        <>
            {giftNotification && (
                <GiftNotification
                    senderName={giftNotification.sender}
                    giftName={giftNotification.gift}
                    onClose={() => setGiftNotification(null)}
                />
            )}
            <div className="MiddleSide">
                <div className="VideoPlace ratio ratio-16x9">
                    {iframeUrl ? (
                        <iframe
                            src={iframeUrl}
                            title="Stream Video"
                            className="w-100 h-100 stream-iframe"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img
                            className="VideoPlaceHolder w-100 h-100 object-fit-cover"
                            src={(props.stream.thumbnail || "https://placehold.co/800x450?text=No+Thumbnail").replace('via.placeholder.com', 'placehold.co')}
                            alt="Stream"
                        />
                    )}
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between my-3 px-3">
                    <div className="text-start d-flex align-items-center mb-3 mb-md-0">
                        <div className="ImgStreamBox mx-3">
                            <Link to={`/profile/${props.stream.user.name}`}>
                                <img
                                    className="StreamerImg"
                                    src={(props.stream.user.pfp || "https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-70x70.png").replace('via.placeholder.com', 'placehold.co')}
                                    alt="Img"
                                />
                            </Link>
                        </div>
                        <div>
                            <h3 className="TextBox">{props.stream.user.name}</h3>
                            <h4 className="TextBox my-0">{props.stream.title}</h4>
                            <Link to={`/game/${props.stream.game.name}`}>
                                <h4 className="TextBox m-0 clickable_text">{props.stream.game.name}</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="text-start d-flex flex-column flex-md-row align-items-start align-items-md-center">
                        {
                            !Issighting && user ?
                                <div className="mb-2 mb-md-0">
                                    <FollowButton doFollowing={props.doFollowing} isFollowing={isFollowing()} user={props.stream.user}></FollowButton>
                                </div>
                                : ""
                        }
                        <div className="ms-0 ms-md-4">
                            <span className="badge bg-danger">{props.stream.viewersnumber >= 1000000 ? props.doViewersDivision(props.stream.viewersnumber, 1000000, 1) + " M " : props.stream.viewersnumber >= 1000 ? props.doViewersDivision(props.stream.viewersnumber, 1000, 1) + " K " : props.stream.viewersnumber}viewers</span>
                        </div>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-12 col-md-6 mb-3">
                        <div className="d-flex justify-content-between ">
                            <h3 className="TextBox mx-4">Acerca de {props.stream.user.name} </h3>
                        </div>
                        <div className="alert alert-info m-4 mt-2 text-card border-0">
                            <div className="d-flex flex-column flex-xl-row justify-content-between my-3">
                                <div className="mx-3 mb-3 mb-xl-0">
                                    <h3 className="TextBox mx-3">{props.stream.user.followers.length} seguidores</h3>
                                    <p className="mx-3 text-break word-break-break-word">{props.stream.user.bio ? props.stream.user.bio : `Hola soy ${props.stream.user.name} y hago streams!`}</p>
                                </div>
                                <div className="text-end me-5">
                                    <SocialLink link={props.stream.user.xlink} icon="bi-twitter-x" text="Twitter"></SocialLink>
                                    <SocialLink link={props.stream.user.instagramlink} icon="bi-instagram" text="Instagram"></SocialLink>
                                    <SocialLink link={props.stream.user.tiktoklink} icon="bi-tiktok" text="Tiktok"></SocialLink>
                                    <SocialLink link={props.stream.user.discordlink} icon="bi-discord" text="Discord"></SocialLink>
                                    <SocialLink link={props.stream.user.youtubelink} icon="bi-youtube" text="Youtube"></SocialLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                            <h3 className="TextBox mx-4">Metas de {props.stream.user.name} </h3>
                        </div>
                        <div className="alert alert-info m-4 mt-2 text-card border-0">
                            <div className="my-3">
                                <ProgressBar actual={props.stream.user.streaminghours} max={props.stream.user.streamerlevel.max_hours} topic={"horas"} ></ProgressBar >
                                <ProgressBar actual={props.stream.user.followers.length} max={props.stream.user.streamerlevel.max_followers} topic={"followers"}></ProgressBar>

                                {user && user.id !== props.stream.user.id && (
                                    <>
                                        <hr className="my-3" />
                                        <h5 className="TextBox mb-2">Mi Progreso como Espectador</h5>
                                        <ProgressBar
                                            actual={progress.current}
                                            max={progress.max}
                                            topic={progress.topic}
                                        ></ProgressBar>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StreamingSection
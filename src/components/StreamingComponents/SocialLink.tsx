import "./../../GlobalObjects/Global.css"
interface SocialLinkProps{
    link : string,
    icon : string,
    text : string
}
const SocialLink = (props : SocialLinkProps) =>{
    return(
        <h4 className="me-0">{props.link? <a className="d-flex align-items-center page-text" href={props.link}><i className = {`bi ${props.icon} mx-2`}> </i>{props.text}</a> : ""}</h4>
    )
}
export default SocialLink;
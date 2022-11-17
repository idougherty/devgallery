import HeaderComponent from "./header";
import ImageGroupComponent from "./imageGroup";
import ParagraphComponent from "./paragraph";

export default function PostComponent(props) {
    switch(props.component.type) {
        case "paragraph":
            return <ParagraphComponent { ...props } />
        case "header":
            return <HeaderComponent { ...props } />
        case "image group":
            return <ImageGroupComponent { ...props } />
        default:
    }
}
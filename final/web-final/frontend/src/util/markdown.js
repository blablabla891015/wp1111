import showdown from 'showdown'
import parse from 'html-react-parser'

// dealing with markdown transformation
export default (markdown) => {
    const converter = new showdown.Converter()
    const html_string = converter.makeHtml(markdown)
    console.log(html_string)
    const parsed_html = parse(html_string)
    // console.log(parsed_html)
    return parsed_html
}
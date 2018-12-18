import './input.styl'
export default {
  functional: true,
  
  render(h, {props, ...rest}){
    let classes = ['fandogh-input']
    let styles = props.styles ? props.styles.split(' ') : []
    styles.forEach(element => classes.push(element));
    return <input value={props.value} type={props.type} onInput={ e => rest.listeners.input(e.target.value)} name={props.name} placeholder={props.placeholder} class={classes}/>
  }
}
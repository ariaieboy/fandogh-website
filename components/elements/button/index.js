import './button.styl'
export default {
  functional: true,
  render(h, { props, ...rest }) {
    let classes = ['btn']
    const clickHandler =  function clickHandler(e) {
      if(!props.path){
        e.preventDefault()
        rest.data.on.onClick(e)
      }
    }
    let styles = props.styles ? props.styles.split(' ') : []
    styles.forEach(element => classes.push('btn-'+element));
    return <router-link to={{path: props.path}} nativeOnClick={clickHandler} class={classes}> {rest.slots().default} </router-link>
  }
}
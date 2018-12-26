import './file.styl'
import FButton from '../button'
export default {
  functional: true,
  render(h, {props, ...rest}){
    const rename = (title) => document.querySelector('.btn-file').innerHTML = title
    let classes = ['btn']
    let styles = props.styles ? props.styles.split(' ') : []
    styles.forEach(element => classes.push('btn-'+element));
    return <div class="upload-btn-wrapper">
      <label> فایل خود را اینجا آپلود کنید</label>
      <input  accept=".zip"  onChange={e => rename(e.target.files[0].name)} type="file" id={props.id} />
      <FButton  styles={'blue file'}> Browse </FButton>
    </div>
  }
}
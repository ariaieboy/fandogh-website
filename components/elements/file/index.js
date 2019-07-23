import './file.styl'
import FButton from '../button'

export default {
  functional: true,
  render(h, {props, ...rest}){
    console.log(document)
    const rename = (title) => document.getElementById('file').innerText = title
    let classes = ['btn']
    let styles = props.styles ? props.styles.split(' ') : []
    styles.forEach(element => classes.push('btn-'+element));
    return <div class="upload-btn-wrapper">
      <label> فایل خود را اینجا آپلود کنید</label>
      <input  accept=".zip"  onChange={e => rename(e.target.files[0].name)} type="file" id={props.id} />
      <button id={'file'} ref={'file'} style={'border-radius: 25px; padding: 12px 32px; font-family: iran-yekan; border: 1px solid #00E5FF; max-width: 200px; overflow: hidden; text-overflow: ellipsis;color: #1d1d1d;'}> Browse </button>
    </div>
  }
}

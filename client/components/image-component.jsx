import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'

export default class ImageUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      done: false,
      showDashboard: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 0,
      preview: null,
      width: 200,
      height: 200
    };
  }

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] })
  }

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
      },
      showDashboard: false,
      done: true,
    })
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value)
    this.setState({ borderRadius })
  }

  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = (e) => {
    const width = parseInt(e.target.value)
    this.setState({ width })
  }

  handleHeight = (e) => {
    const height = parseInt(e.target.value)
    this.setState({ height })
  }

  logCallback (e) {
    console.log('callback', e)
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    console.log('Position set to', position)
    this.setState({ position })
  }

  getDashBoard() {
    return (
      <div className='image-dashboard'>
        <div>
          <label>Zoom:</label>
          <input
            name='scale'
            type='range'
            onChange={this.handleScale}
            min='1'
            max='2'
            step='0.01'
            defaultValue='1'
          />
        </div>
        <div>
          <label>Border radius:</label>
          <input
            name='scale'
            type='range'
            onChange={this.handleBorderRadius}
            min='0'
            max='100'
            step='1'
            defaultValue='0'
          />
        </div>
        <div>
          <label>Width:</label>
          <input
            name='width'
            type='number'
            onChange={this.handleWidth}
            min='50'
            max='400'
            step='10'
            value={this.state.width}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            name='height'
            type='number'
            onChange={this.handleHeight}
            min='50'
            max='400'
            step='10'
            value={this.state.height}
          />
        </div>
        <div>
          <label>X Position:</label>
          <input
            name='scale'
            type='range'
            onChange={this.handleXPosition}
            min='0'
            max='1'
            step='0.01'
            value={this.state.position.x}
          />
        </div>
        <div>
          <label>Y Position:</label>
          <input
            name='scale'
            type='range'
            onChange={this.handleYPosition}
            min='0'
            max='1'
            step='0.01'
            value={this.state.position.y}
          />
        </div>
        <div>
         <input id='done-button' className='done-button' type='button' onClick={this.handleSave} value='Preview' />
        </div>
      </div>
    );
  }
  render () {
    if (this.state.done) {
      return (
        <div>
          {
            !!this.state.preview &&
            <img
              src={this.state.preview.img}
              style={{ borderRadius: `${(Math.min(this.state.preview.height, this.state.preview.width) + 10) * ((this.state.preview.borderRadius / 2) / 100)}px` }}
              onClick={() => this.setState({ done: false })}
            />
          }
        </div>
      );
    }

    return (
      <div className='image-uploader'>
        <div className='uploaded-image'>
          <ReactAvatarEditor
            style={{ display: this.state.showDashboard ? 'block' : 'none' }}
            ref={this.setEditorRef}
            scale={parseFloat(this.state.scale)}
            width={this.state.width}
            height={this.state.height}
            position={this.state.position}
            onPositionChange={this.handlePositionChange}
            rotate={parseFloat(this.state.rotate)}
            borderRadius={this.state.borderRadius}
            onSave={this.handleSave}
            onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
            onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
            onImageReady={() => this.setState({ showDashboard: true })}
            onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
            onDropFile={this.logCallback.bind(this, 'onDropFile')}
            image={this.state.image || 'avatar.jpg'}
          />
        </div>
        { this.state.showDashboard ? this.getDashBoard() : <div /> }
        <div>
          <label className="upload-button" htmlFor='file'>UPLOAD A PICTURE</label>
          <input
            style={{display: 'none'}}
            id='file'
            name='newImage'
            type='file'
            onChange={this.handleNewImage}
          />
        </div>
      </div>
    )
  }
}

// Used to display the cropping rect
class ImageWithRect extends React.Component {
  constructor (props) {
    super(props)

    this.setCanvas = this.setCanvas
    this.handleImageLoad = this.handleImageLoad
  }

  componentDidMount () {
    this.redraw()
  }

  componentDidUpdate () {
    this.redraw()
  }

  setCanvas (canvas) {
    if (canvas) this.canvas = canvas
  }

  handleImageLoad () {
    const ctx = this.canvas.getContext('2d')
    const { rect, width, height } = this.props

    ctx.clearRect(0, 0, width, height)

    ctx.strokeStyle = 'red'

    if (rect && (rect.width > 1 || rect.height > 1)) {
      ctx.drawImage(
        this.imgElement,
        Math.round(-rect.x * (width / rect.width)),
        Math.round(-rect.y * (height / rect.height)),
        Math.round(width / rect.width),
        Math.round(height / rect.height)
      )

      if (rect) {
        ctx.strokeRect(
          1,
          1,
          Math.round(width) - 2,
          Math.round(height) - 2
        )
      }
    } else {
      ctx.drawImage(this.imgElement, 0, 0, width, height)

      if (rect) {
        ctx.strokeRect(
          Math.round(rect.x * width) + 0.5,
          Math.round(rect.y * height) + 0.5,
          Math.round(rect.width * width),
          Math.round(rect.height * height)
        )
      }
    }
  }

  redraw () {
    const img = new Image()

    img.src = this.props.image
    img.onload = this.handleImageLoad
    this.imgElement = img
  }

  render () {
    return (
      <canvas
        ref={this.setCanvas}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}

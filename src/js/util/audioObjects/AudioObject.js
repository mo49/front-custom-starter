import WebAudioAPIAudioObject from "./WebAudioAPIAudioObject"
import HTML5AudioObject from "./HTML5AudioObject"

const _AudioObject = WebAudioAPIAudioObject.canUse ? WebAudioAPIAudioObject : HTML5AudioObject
window.AudioObject = _AudioObject
export default _AudioObject

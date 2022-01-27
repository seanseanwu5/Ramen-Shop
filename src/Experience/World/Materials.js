import * as THREE from 'three'
import Experience from '../Experience.js'
import vertexShader from '../../shaders/chromaShaders/vertex.glsl'
import fragmentShader from '../../shaders/chromaShaders/fragment.glsl'

export default class Materials
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        console.log(vertexShader)

        this.mapColors()

        // Wait for textures
        this.resources.on('ready', () =>
        {
            this.mapTextures()
        })
    }

    mapColors()
    {
        // non-glowing lights
        this.greenSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#1EFF51')})
        this.redSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF0033')})
        this.whiteSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFFFFF')})
        this.blackSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#000000')})
        this.pinkSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF2FD5')})
        this.blueSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#01DDFF')})
        this.orangeSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF5100')})
        this.redLedMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF112B')})
        this.greenLedMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#00FF00')})
        this.grayLedOffMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#585858')})
        this.grayLedOnMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFFFFF')})

        // glowing lights
        this.neonYellowMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFF668')})
        this.neonPinkMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF3DCB')})
        this.neonBlueMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#00BBFF')})
        this.poleLightMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF5EF1')})
        this.neonGreenMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#56FF54')})
    }

    mapTextures()
    {

        // map baked textures
        this.ramenShopMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.ramenShopBakedTexture })
        this.machinesMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.machinesBakedTexture })
        this.floorMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.floorBakedTexture })
        this.miscMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.miscBakedTexture })
        this.graphicsMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.graphicsBakedTexture })

        // map matcap textures
        this.dishMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.dishMatcapTexture, side: THREE.DoubleSide})
        this.fanMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.fanMatcapTexture})

        // map screen textures
        this.bigScreenMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.bigScreenDefaultTexture })
        this.arcadeScreenMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.arcadeScreenDefaultTexture })
        this.vendingMachineScreenMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.vendingMachineDefaultTexture })

        // Map video textures

        // https://discourse.threejs.org/t/basis-video-texture/12716/2

        this.littleTVScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.littleTVScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.tallScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.tallScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.tvScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.tvScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));

        this.smallScreen4VideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.smallScreen4VideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.smallScreen5VideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.smallScreen5VideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        

        for ( let i = 0; i < Object.keys(this.resources.video).length; i ++ ) {

            this.resources.video[Object.keys(this.resources.video)[i]].play()
        }

        this.resources.trigger('texturesMapped')
    }

    getChromaKeyShaderMaterial(texture, color) {
    
        return new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            map: {
              value: texture
            },
            keyColor: {
              value: color.toArray()
            },
            similarity: {
              value: 0.01
            },
            smoothness: {
              value: 0.0
            }
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        });
      }

}




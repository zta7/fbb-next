/* eslint-disable */
import { fabric } from 'fabric'
import { debounce, pick, toPath, get, groupBy,cloneDeep } from 'lodash'
import { shallowRef, watch } from 'vue'
import { uid, dom } from 'quasar'
import key from 'keymaster'
import { Pane } from 'tweakpane'

const useCanvas = ({ el, scrollWrapperRef, category, json = '{}' }) => {
  try {
    JSON.parse(json)
  } catch (e) {
    json = '{}'
  }
  
  const updateParent = debounce(() => {
    window.top.postMessage({
      target: 'fbb',
      data: JSON.stringify(canvas.toObject())
    }, '*')
  }, 100)
  const { width, height, backgroundColor } = JSON.parse(json)
  let _clipboard, canvas
  const canvasRef = document.getElementById(el)
  canvas = new fabric.Canvas(el)


  canvas.close = () => {
    if (canvas.pane) canvas.pane.close()
    if (canvas.keys) canvas.keys.map(e => key.unbind(e.key))
    canvas.dispose()
  }
  const selectedNode = shallowRef(null)
  let a = canvas.loadFromJSON(
    json, 
    () => {
      console.log(12345)
      canvas.setWidth(width || canvasRef.width || 500)
      canvas.setHeight(height || canvasRef.height || 500)
      canvas.setBackgroundColor(backgroundColor || 'rgba(0, 0, 0, 0)', canvas.renderAll.bind(canvas))
      console.log(cloneDeep(canvas))
      fabric.Observable.fire('canvas:loadFromJSON')
    }
  )

  const useEvents = keys => {
    let events = {
      'selection:created': e => {
        selectedNode.value = e.target
      },
      'selection:updated': e => {
        selectedNode.value = e.target
      },
      'selection:cleared': () => {
        selectedNode.value = null
      },
      'object:moving': e => {

        console.log(e)

        const obj = e.target
        if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) {
          return
        }
        obj.setCoords()
        if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
          obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top)
          obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left)
        }
        if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
          obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top)
          obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left)
        }
        if (canvas.pane) canvas.pane.refresh()
      },
      'object:modified': (e) => {
        // console.log(e)
        if (canvas.pane) canvas.pane.refresh()
      },
      'object:added': e => {
        if (!e.target.id) { e.target.set('id', uid()) }
        updateParent()
      },
      'object:removed': () => {
        updateParent()
      }
    }
    if (keys) events = pick(events, keys)
    canvas.on(events)
  }
  const useKeys = keys => {
    const events = [
      {
        key: 'del',
        desc: 'Delete Object',
        fn: () => {
          const activeObjects = canvas.getActiveObjects()
          for (let i = activeObjects.length - 1; i >= 0; i--) {
            canvas.remove(activeObjects[i])
          }
          canvas.discardActiveObject().renderAll()
        }
      },
      {
        key: '⌘+c, ctrl+c',
        desc: 'Copy Object',
        fn: () => {
          if (canvas.getActiveObject()) {
            canvas.getActiveObject().clone(function (cloned) {
              _clipboard = cloned
            })
          }
        }
      },
      {
        key: '⌘+v, ctrl+v',
        desc: 'Paste Clipboard',
        fn: () => {
          if (_clipboard) {
            _clipboard.clone(function (clonedObj) {
              canvas.discardActiveObject()
              clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true
              })
              if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = canvas
                clonedObj.forEachObject(function (obj) {
                  obj.id = uid()
                  canvas.add(obj)
                })
                clonedObj.setCoords()
              } else if (clonedObj.type === 'group') {
                clonedObj.id = uid()
                const objects = clonedObj.getObjects()
                objects.forEach(e => {
                  e.id = uid()
                })
                canvas.add(clonedObj)
              } else {
                clonedObj.id = uid()
                canvas.add(clonedObj)
              }
              _clipboard.top += 10
              _clipboard.left += 10
              canvas.setActiveObject(clonedObj)
              canvas.requestRenderAll()
            })
          }
        }
      },
      {
        key: '⌘+g, ctrl+g',
        desc: 'Group/UnGroup',
        fn: e => {
          e.preventDefault()
          if (canvas.getActiveObject() && canvas.getActiveObject().type === 'activeSelection') {
            selectedNode.value = canvas.getActiveObject().toGroup()
            canvas.requestRenderAll()
          } else if (canvas.getActiveObject() && canvas.getActiveObject().type === 'group') {
            selectedNode.value = canvas.getActiveObject().toActiveSelection()
            canvas.requestRenderAll()
          }
        }
      }
    ]
    let filteredEvents = keys ? events.filter(e => keys.includes(e.key)) : events
    // eslint-disable-next-line array-callback-return
    filteredEvents.map(e => {
      key(e.key, e.fn)
    })
    canvas.keys = filteredEvents
    return {
      filteredEvents
    }
  }
  const usePane = (el, bindOptions) => {
    const addComponents = shallowRef()
    let canvasSettingsFolder, selectedNodeFolder, addComponentFolder, shortcutsFolder, pane
    pane = new Pane({
      container: el,
      title: 'HMI Configs'
    })
    const draw = (folder, target, e) => {
      const keyPath = toPath(e.key)
      const toObject = keyPath.length === 1 ? target : get(target, keyPath.slice(0, -1))
      const toKey = keyPath.length === 1 ? keyPath[0] : keyPath[keyPath.length - 1]
      if (e.isImage) {
        const _button = folder.addButton({ title: 'Upload Image', label: e.key })
        _button.on('click', () => {
          const input = document.getElementById('img')
          input.value = ''
          input.addEventListener('change', function () {
            const file = input.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function (evt) {
              target.setSrc(this.result, () => {
                canvas.requestRenderAll()
              })
            }
          })
          input.click()
        })
      } else if (e.isFolder) {
        const _folder = folder.addFolder({ title: e.key })
        e.props.forEach(e2 => {
          draw(_folder, target, e2)
        })
      } else {
        const changeFn = e => {
          target.dirty = true
          if (toKey === 'index' && e.last) target.moveTo(e.value)
          canvas.requestRenderAll()
        }
        if (e.bindOptions) {
          folder.addInput(toObject, toKey, { options: bindOptions[e.bindOptions] }).on('change', changeFn)
        } else {
          folder.addInput(toObject, toKey, e.props).on('change', changeFn)
        }
      }
    }
    const typeFn = (e, type = '') => {
      const _type = type + e.type || ''
      if (e[e.type] && get(e[e.type], 'type')) return typeFn(e[e.type], _type + '.')
      return _type
    }
    const commonProps = [
      {
        key: 'top'
      },
      {
        key: 'left'
      },
      {
        key: 'angle',
        props: { min: 0, max: 359 }
      },
      {
        key: 'backgroundColor',
        props: { options: { alpha: true } }
      },
      {
        key: 'index',
        props: {
          min: 1,
          max: 1000,
          step: 1
        }
      },
      {
        key: 'opacity',
        props: { min: 0, max: 1 }
      }
    ]
    const propsMap = {
      group: [
        ...commonProps.filter(e => !['backgroundColor', 'opacity'].includes(e.key))
      ],
      activeSelection: [
        ...commonProps.filter(e => !['backgroundColor', 'opacity', 'index'].includes(e.key))
      ],
      path: [
        ...commonProps,
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        }
      ],
      rect: [
        ...commonProps,
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
        },
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.fill',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      triangle: [
        ...commonProps,
        {
          key: 'fill'

        },
        {
          key: 'stroke'

        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.fill',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      circle: [
        ...commonProps,
        {
          key: 'fill'

        },
        {
          key: 'stroke'

        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.fill',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      text: [
        ...commonProps,
        {
          key: 'text'
        },
        {
          key: 'fill'
        }
      ],
      'i-text': [
        ...commonProps,
        {
          key: 'text'
        },
        {
          key: 'fill'
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.text',
              bindOptions: 'outputs'
            }
          ]
        }
      ],
      checkbox: [
        ...commonProps,
        {
          key: 'value'
        },
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
        },
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'outputs'
            }
          ]
        }
      ],
      button: [
        ...commonProps,
        {
          key: 'text'
        },
        {
          key: 'fontSize'
        },
        {
          key: 'fontColor'
        },
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
          //
        },
        {
          key: 'stroke'
          //
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.text',
              bindOptions: 'outputEvents'
            }
          ]
        }
      ],
      image: [
        ...commonProps,
        {
          key: 'src',
          isImage: true
        }
      ],
      arc: [
        ...commonProps,

        {
          key: 'lineWidth'
        },
        {
          key: 'value'
        },
        {
          key: 'min'
        },
        {
          key: 'max'
        },
        {
          key: 'progressBarColor'
        },
        {
          key: 'backgroudBarColor'
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      progress: [
        ...commonProps,
        {
          key: '_value'
        },
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
        },
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: '_min'
        },
        {
          key: '_max'
        },
        {
          key: 'progressBarColor'
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      slider: [
        ...commonProps,
        {
          key: 'value'
        },
        {
          key: 'min'
        },
        {
          key: 'max'
        },
        {
          key: 'barColor'
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'outputs'
            }
          ]
        }
      ],
      toggle: [
        ...commonProps,
        {
          key: 'value'
        },
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
        },
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'switchOnColor'
        },
        {
          key: 'switchOffColor'
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'outputs'
            }
          ]
        }

      ],
      select: [
        ...commonProps,
        {
          key: 'value'
        },
        {
          key: 'options'
        },
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
        },
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'outputs'
            }
          ]
        }
      ],
      unitBox: [
        ...commonProps,
        {
          key: 'value'
        },
        {
          key: 'category',
          props: { options: { brightness: 'brightness', humidity: 'humidity', temperature: 'temperature', energy: 'energy' } }
        },
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
        },
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: { min: 0, max: 100, step: 1 }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      'gauge.linear': [
        ...commonProps,
        {
          key: 'gauge.value'
        },
        {
          key: 'gauge.minValue'
        },
        {
          key: 'gauge.maxValue'
        },
        {
          key: 'gauge.majorStep',
          props: { min: 0, max: 200 }

        },
        {
          key: 'gauge.minorTicks',
          props: { min: 0, max: 5, step: 1 }
        },
        {
          key: 'gauge.units'
        },
        {
          key: 'gauge.title'
        },
        {
          key: 'gauge.colorBarProgress'

        },
        {
          key: 'gauge.barWidth',
          props: { min: 0, max: 20, step: 1 }

        },
        {
          key: 'gauge.barBeginCircle'

        },
        {
          key: 'gauge.tickSide',
          props: { options: { left: 'left', right: 'right', both: 'both' } }
        },
        {
          key: 'gauge.needleSide',
          props: { options: { left: 'left', right: 'right', both: 'both' } }
        },
        {
          key: 'gauge.numberSide',
          props: { options: { left: 'left', right: 'right', both: 'both' } }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      'gauge.radial': [
        ...commonProps,
        {
          key: 'gauge.value'
        },
        {
          key: 'gauge.minValue'
        },
        {
          key: 'gauge.maxValue'
        },
        {
          key: 'gauge.majorStep',
          props: { min: 0, max: 200 }
        },
        {
          key: 'gauge.minorTicks',
          props: { min: 0, max: 5, step: 1 }
        },
        {
          key: 'gauge.units'
        },
        {
          key: 'gauge.title'
        },
        {
          key: 'gauge.colorBarProgress'

        },
        {
          key: 'gauge.barWidth',
          props: { min: 0, max: 20, step: 1 }

        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              bindOptions: 'inputs'
            }
          ]
        }
      ],
      'chart.bar': [
        ...commonProps,
        {
          key: 'binds',
          isFolder: true,
          props: [
          // {
          //   key: 'binds.value',
          //   bindOptions: 'inputs',
          // },
          ]
        }
      ],
      'chart.line': [
        ...commonProps
      ],
      'chart.pie': [
        ...commonProps
      ],
      'chart.bubble': [
        ...commonProps
      ],
      trafficLights: [
        ...commonProps,
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.horizontalText',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.veriticalText',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.horizontalRedLight',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.horizontalYellowLight',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.horizontalGreenLight',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.veriticalRedLight',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.veriticalYellowLight',
              bindOptions: 'inputs'
            },
            {
              key: 'binds.veriticalGreenLight',
              bindOptions: 'inputs'
            }
          ]
        }
      ]
    }
    canvas.pane = pane
    canvasSettingsFolder = pane.addFolder({ title: 'Canvas Settings', expanded: false })
    if (canvas.keys) {
      shortcutsFolder = pane.addFolder({ title: 'Shortcuts', expanded: false })
      canvas.keys.forEach(e => {
        const btn = shortcutsFolder.addButton({
          title: `${e.desc}`,
          label: `${e.key}`
        })
        btn.on('click', () => e.fn())
      })
    }
    addComponentFolder = pane.addFolder({ title: 'Add Component', expanded: false })
    selectedNodeFolder = pane.addFolder({ title: 'Selected Node', expanded: false })
    selectedNodeFolder.redraw = n => {
      selectedNodeFolder.children.forEach(e => e.dispose())
      selectedNodeFolder.title = `Selected Node ${get(n, 'type')}`
      if (n) {
        const props = propsMap[typeFn(n)]
        if (props) {
          props.forEach(e => {
            draw(selectedNodeFolder, n, e)
          })
        }
      }
    }
    
    canvasSettingsFolder.addInput(canvas, 'width', { min: 100, max: 10000, step: 50 }).on('change', e => {
      canvas.setWidth(e.value)
    })
    canvasSettingsFolder.addInput(canvas, 'height', { min: 100, max: 10000, step: 50 }).on('change', e => {
      canvas.setHeight(e.value)
    })
    canvasSettingsFolder.addInput(canvas, 'perPixelTargetFind')

    const unwatch1 = watch(selectedNode, n => {
      selectedNodeFolder.redraw(n)
    })

    const unwatch2 = watch(addComponents, n => {
      addComponentFolder.children.forEach(e => e.dispose())
      canvas.addComponents = n
      if (category === 'HMI') {
        const grouped = groupBy(n, 'category')
        for (const [k, v] of Object.entries(grouped)) {
          const folder = addComponentFolder.addFolder({ title: k })
          v.forEach(e => {
            const btn = folder.addButton({
              title: 'Add To Center',
              label: `${e.label}`
            })
            btn.on('click', () => {
              let obj
              const { top, left } = scrollWrapperRef.value.getScrollPosition()
              const refHeight = dom.height(scrollWrapperRef.value.$el)
              const refWidth = dom.width(scrollWrapperRef.value.$el)
              const canvasWidth = canvas.width
              const canvasHeight = canvas.height
              let width, height
              canvasWidth < refWidth ? width = canvasWidth : width = refWidth
              canvasHeight < refHeight ? height = canvasHeight : height = refHeight

              if (e.type === 'image') {
                const input = document.getElementById('img')
                input.value = ''
                input.addEventListener('change', function () {
                  const file = input.files[0]
                  const reader = new FileReader()
                  reader.readAsDataURL(file)
                  reader.onload = function (evt) {
                    obj = e.create({ left: width / 2 + left, top: height / 2 + top, src: this.result })
                  }
                })
                input.click()
              } else {
                obj = e.create()
                obj.left = (width / 2 + left) - obj.width / 2
                obj.top = (height / 2 + top) - obj.height / 2
                canvas.add(obj)
              }
            })
          })
        }
      } else if (category === 'Canvas') {
        n.forEach(e => {
          const btn = addComponentFolder.addButton({
            title: 'Add To Center',
            label: `${e.application.text}\n${e.fbb.FBB}\n${e.fbb.namespace}\n${e.fbb.name}`
          })
          btn.on('click', () => {
            if (e && canvas) {
              const block = get(e, 'block')
              const panelJson = get(block, 'panel')
              const panel = JSON.parse(panelJson)
              fabric.util.enlivenObjects(panel.objects, objs => {
                const group = new fabric.Group(objs, { raw_id: block.id, _prePath: block._prePath })
                const { top, left } = scrollWrapperRef.value.getScrollPosition()
                const refHeight = dom.height(scrollWrapperRef.value.$el)
                const refWidth = dom.width(scrollWrapperRef.value.$el)
                const canvasWidth = canvas.width
                const canvasHeight = canvas.height
                let width, height
                canvasWidth < refWidth ? width = canvasWidth : width = refWidth
                canvasHeight < refHeight ? height = canvasHeight : height = refHeight
                group.left = (width / 2 + left) - group.width / 2
                group.top = (height / 2 + top) - group.height / 2
                canvas.add(group)
              })
            }
          })
        })
      }
    })

    pane.on('change', e => {
      updateParent()
    })

    pane.close = () => {
      pane.dispose()
      unwatch1()
      unwatch2()
    }

    return {
      addComponents,
      bindOptions,
      pane,
      setBindOptions (k, v) {
        bindOptions[k] = v
        selectedNodeFolder.redraw(selectedNode.value)
      }
    }
  }
  const onRefresh = () => {
    if (canvas && canvas.addComponents && category === 'Canvas') {
      canvas.forEachObject(e => {
        if (e.type === 'group' && e.raw_id) {
          const blocks = canvas.addComponents.map(e => e.block)
          const block = blocks.find(b => b.id === e.raw_id)
          if (block) {
            const panelJson = get(block, 'panel')
            const panel = JSON.parse(panelJson)
            fabric.util.enlivenObjects(panel.objects, objs => {
              // eslint-disable-next-line camelcase
              const { left, top, raw_id, skewX, shewY, index, scaleX, scaleY, angle } = e
              canvas.remove(e)
              canvas.add(
                new fabric.Group(objs, { raw_id, _prePath: block._prePath, left, top, skewX, shewY, index, scaleX, scaleY, angle })
              )
            })
          } else {
            canvas.remove(e)
          }
        } else {
          canvas.remove(e)
        }
      })
    }
  }

  return {
    canvas,
    selectedNode,

    useEvents,
    useKeys,
    usePane,

    onRefresh
  }
}

export default useCanvas

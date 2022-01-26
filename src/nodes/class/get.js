const AbstractNode = require('../abstract')
const AbstractActor = require('../../module/actor/abstract')

class ClassVariableGet extends AbstractNode {

  static metadata() {
    return {
      name: 'Get Class Variable',
      code: 'class/get',
      type: 'getter',
      deleteable: true,
      addable: false,
      inputs: {
        object: {
          code: 'object',
          name: 'Object',
          type: 'bluep/class'
        }
      },
      outputs: {}
    }
  }

  async execute(inputs) {
    this.debug('execute', this._node.code)
    // console.log('execute', this._node.data, inputs)
    if (this._node.data.context === 'schema') {
      if (!inputs.object) return
      // actors states are working save as class properies
      const ret = inputs.object instanceof AbstractActor
        ? inputs.object.state(this._node.data.code)
        : inputs.object[this._node.data.code]
      this.setOutput(this._node.data.code, ret)
    } else {
      const val = this._context.getOutput(this._node.data.context, this._node.data.code)
      this.setOutput(this._node.data.code, val)
    }
  }
}

module.exports = ClassVariableGet

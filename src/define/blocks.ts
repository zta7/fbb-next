const inputEvent = {
  icon: 'mdi-rotate-left',
  iconColor: 'orange',
  header: 'item',
}
const outputEvent = {
  icon: 'mdi-rotate-right',
  iconColor: 'orange',
  header: 'item',
}
const input = {
  icon: 'mdi-arrow-left',
  iconColor: 'orange',
  header: 'item',
}
const output = {
  icon: 'mdi-arrow-right',
  iconColor: 'orange',
  header: 'item',
}
const internal = {
  icon: 'mdi-dots-horizontal-circle-outline',
  iconColor: 'orange',
  header: 'item',
}
const temp = {
  icon: 'mdi-dots-vertical-circle-outline',
  iconColor: 'orange',
  header: 'item',
}
const algorithm = {
  icon: 'mdi-code-tags',
  iconColor: 'teal-8',
  header: 'item',
}
const application = {
  icon: 'mdi-application',
  iconColor: 'teal-8',
  header: 'item',
}

const blocks = {
  BasicFunctionBlock: {
    caption: 'BFB',
    icon: 'img:blocks/BasicFunctionBlock.svg',
    inputEvent,
    outputEvent,
    input,
    output,
    internal,
    temp,
    algorithm,
  },
  SubApplication: {
    caption: 'Sub',
    icon: 'img:blocks/SubApplication.svg',
  },
  HMI: {
    caption: 'HMI',
    icon: 'img:blocks/HMI.svg',
    inputEvent,
    outputEvent,
    input,
    output,
  },
  Adapter: {
    caption: 'Adp',
    icon: 'img:blocks/Adapter.svg',
  },
  CompositeFunctionalBlock: {
    caption: 'CFB',
    icon: 'img:blocks/CompositeFunctionalBlock.svg',
  },
  CustomDataStructure: {
    caption: 'Ca',
    icon: 'img:blocks/CustomDataStructure.svg',
  },
  ServiceFunctionBlock: {
    caption: 'SIFB',
    icon: 'img:blocks/ServiceFunctionBlock.svg',
  },
  SimpleFunctionBlock: {
    caption: 'SFB',
    icon: 'img:blocks/SimpleFunctionBlock.svg',
  },
  SystemConfiguration: {
    caption: 'Sys',
    icon: 'img:blocks/SystemConfiguration.svg',
    application,
  },
}

export const dataTypes = [
  'BOOL', 'SINT', 'INT', 'DINT', 'USINT', 'UINT', 'UDINT', 'REAL', 'WSTRING', 'LINT', 'ULINT',
  'TIME_OF_DAY', 'DATE_AND_TIME', 'BYTE', 'WORD', 'DWORD', 'LWORD', 'DATA', 'TIME',
]

export default blocks

export const types = Object.keys(blocks)

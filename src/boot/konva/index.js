import { _registerNode } from 'konva/lib/Global'
import { Anchor } from './Anchor'
import { FunctionBlock } from './FunctionBlock'
import { Link } from './Link'
import { IText } from './IText'
import { Selection } from './Selection'

import { Test } from './Test'

import './Node'
import './Layer'

_registerNode(Anchor)
_registerNode(IText)
_registerNode(Selection)
_registerNode(FunctionBlock)
_registerNode(Link)
_registerNode(Test)

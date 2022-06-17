import { _registerNode } from 'konva/lib/Global'
import { Anchor } from './Anchor'
import { FunctionBlock } from './FunctionBlock'
import { Link } from './Link'
import { IText } from './IText'
import { Selection } from './Selection'
import { EventAnchor } from './EventAnchor'
import { IoAnchor } from './IoAnchor'

import { Test } from './Test'

import './Node'
import './Layer'

_registerNode(Anchor)
_registerNode(EventAnchor)
_registerNode(IoAnchor)
_registerNode(IText)
_registerNode(Selection)
_registerNode(FunctionBlock)
_registerNode(Link)
_registerNode(Test)

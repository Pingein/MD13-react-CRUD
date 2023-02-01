import { AxiosParameters, GPU } from './interfaces'
import axios from 'axios'
import React, { useState } from 'react'

async function addGPUtoDB(url:string, gpu: GPU) {
    axios.post(url, {manufacturer: gpu.manufacturer,
                     vendor: gpu.vendor,
                     model: gpu.model,
                     vram: gpu.vram,
                     price: gpu.price})
}







const removeAllChildElements = (parent_element:HTMLElement) => {
    let children = [...parent_element.childNodes]
    children.forEach(node => node.remove())
}


export { addGPUtoDB, removeAllChildElements }
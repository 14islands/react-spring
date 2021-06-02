import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSpring, a } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { VRCanvas, Interactive, DefaultXRControllers } from '@react-three/xr'

import styles from './styles.module.css'

function Box() {
  const box = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const props = useSpring({ scale: isHovered ? 2 : 1 })

  useFrame((_, delta) => {
    if (box.current) {
      // @ts-ignore
      box.current.rotation.y += delta
    }
  })

  return (
    <Interactive
      onHover={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}>
      <a.mesh
        ref={box}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        position={[0, 0, -5]}
        {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={isHovered ? 'green' : 'red'} />
      </a.mesh>
    </Interactive>
  )
}

export default function App() {
  console.log('three-vr demo')
  return (
    <div className={styles.container}>
      <VRCanvas>
        <Box />
        <DefaultXRControllers />
      </VRCanvas>
    </div>
  )
}

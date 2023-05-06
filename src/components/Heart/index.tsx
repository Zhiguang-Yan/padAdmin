import { FC, useEffect, useRef, useState } from 'react'
import './index.scss'
import mojs from '@mojs/core'

const Heart: FC = () => {
  const thumbsUp = () => {
    hearted ? setHearted(false) : new mojs.Timeline().add(burst, aperture, bounce).play()
  }
  const heartRef = useRef<HTMLDivElement | null>(null)
  const heartSvg = useRef<SVGSVGElement | null>(null)
  const [hearted, setHearted] = useState(false)
  const [heartP, setHeartP] = useState(1)
  const [heartStyle, setHeartStyle] = useState({})
  const aperture = new mojs.Transit({
    parent: heartRef.current,
    duration: 750,
    type: 'circle',
    radius: { 0: 50 },
    fill: 'transparent',
    stroke: '#E05B5B',
    strokeWidth: { 50: 0 },
    opacity: 0.6,
    isRunLess: true,
    easing: mojs.easing.bezier(0, 1, 0.5, 1)
  })
  const burst = new mojs.Burst({
    radius: { 0: 75 },
    parent: heartRef.current,
    easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    delay: 300,
    children: {
      duration: 750,
      radius: { 0: 'rand(5, 25)' },
      shape: ['circle', 'rect', 'polygon'],
      fill: [
        '#1abc9c',
        '#2ecc71',
        '#00cec9',
        '#3498db',
        '#9b59b6',
        '#fdcb6e',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#e84393'
      ],
      degreeShift: 'rand(-90, 90)',
      delay: 'stagger(0, 40)'
    },
    opacity: 0.6,
    count: 10,
    onStart() {
      // 发送点赞请求
      setHearted(true)
    }
  })
  const bounce = new mojs.Tween({
    duration: 1200,
    onUpdate: function (progress) {
      const speed = progress > 0.3 ? mojs.easing.elastic.out(1.43 * progress - 0.43) : 0
      setHeartP(speed)
    }
  })

  useEffect(() => {
    setHeartStyle({
      fill: `${hearted ? '#E05B5B' : ''}`,
      stroke: `${hearted ? '#E05B5B' : ''}`,
      transform: `scale3d(${heartP},${heartP},1)`
    })
  }, [heartP, hearted])
  return (
    <div ref={heartRef} className="heart" onClick={thumbsUp}>
      <svg
        ref={heartSvg}
        className="icon"
        style={heartStyle}
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2660"
      >
        <path
          d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z"
          p-id="2661"
        ></path>
      </svg>
    </div>
  )
}

export default Heart

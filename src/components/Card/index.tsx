import { FC } from 'react'
import Heart from '@/components/Heart'
import './index.scss'
const Card: FC = () => {
  return (
    <div className="card">
      <div className="bg">
        <img src="https://bpic.588ku.com/back_our/20210304/bg/7efeeecb5f885.png" alt="" />
      </div>
      <div className="content">
        <div className="avatar">
          <img
            src="https://tse4-mm.cn.bing.net/th/id/OIP-C.Ido-nzOdM7Qw4Iki83BsNgHaHZ?w=207&h=206&c=7&r=0&o=5&pid=1.7"
            alt=""
          />
        </div>
        <div className="title">
          <Heart />
        </div>
      </div>
    </div>
  )
}

export default Card

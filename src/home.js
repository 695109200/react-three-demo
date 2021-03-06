import css from './index.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
        <h1>react-three-demo</h1>
        <div className="demoBox">

          <Link to="/demo1" target='div' className="demoItem">
             <img src="static/preview/demo1.png"></img>
             <div>旋转的立方体</div>
          </Link>

          <Link to="/demo2" target='div' className="demoItem">
              <img src="static/preview/demo2.png"></img>
              <div>建立镜头操控,三维坐标系和地板</div>
          </Link>

          <Link to="/demo3" target='div' className="demoItem">
              <img src="static/preview/demo3.png"></img>
              <div>载入glb模型</div>
          </Link>

          <Link to="/demo4" target='div' className="demoItem">
              <img src="static/preview/demo4.png"></img>
              <div>获取所选中的物体</div>
          </Link>

          <Link to="/demo5" target='div' className="demoItem">
              <img src="static/preview/demo5.png"></img>
              <div>Tween构建位移动画</div>
          </Link>

          <Link to="/demo6" target='div' className="demoItem">
              <img src="static/preview/demo6.png"></img>
              <div>执行导入模型里的动画</div>
          </Link>

          <Link to="/demo7" target='div' className="demoItem">
              <img src="static/preview/demo7.png"></img>
              <div>光源与阴影</div>
          </Link>

          <Link to="/demo8" target='div' className="demoItem">
              <img src="static/preview/demo8.png"></img>
              <div>拖动模型</div>
          </Link>

          <Link to="/demo9" target='div' className="demoItem">
              <img src="static/preview/demo9.png"></img>
              <div>点击画线测距离</div>
          </Link>
          <Link to="/demo10" target='div' className="demoItem">
              <img src="static/preview/demo10.png"></img>
              <div>天空盒子</div>
          </Link>
          <Link to="/demo11" target='div' className="demoItem">
              <img src="static/preview/demo11.png"></img>
              <div>仿法拉第汽车场景</div>
          </Link>
        </div>
    </div>
  );
}
export default Home;
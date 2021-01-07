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
              <div>Tween构建动画</div>
          </Link>
          
        </div>
    </div>
  );
}
export default Home;
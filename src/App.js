import Forms from './component/forms';
import TableBlock from './containers/table'
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import './main.scss'

const App = () => {

  const token = JSON.parse(localStorage.getItem('token'))

  return ( 
    <div className='app'>
        {
        token ? (
          <TableBlock token={token} />
          ):(
          <Forms />
          )
        }
    </div>
   );
}
 
export default App;
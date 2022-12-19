import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Tag ,message} from 'antd'
const Password = ({me,password, setPassword, onLogin}) => {
    const value=(password)=>{
        let res=''
        for(let i=0;i<password.length;i++){
            res=res+'*'
        }
        return {res,password}
    }
 return (
 <Input.Password
 size="large"
 style={{ width: 300, margin: 50 }}
 prefix={<UserOutlined />}
 placeholder="Enter your password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
//  enterButton="Sign In"
//  onSearch={() => onLogin(me,password)}
 />
 );}
export default Password;
import {Modal,Form,Input} from 'antd';
const RegModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const Namefrom=()=>(<Form.Item
    name="name"
    label="Name"
    rules={[
    {
    required: true,
    message: 'Error: Please enter the name of the person to chat!',
      },
    ]}
   >
       <Input />
       </Form.Item>)
    const Passwordfrom=()=>(<Form.Item
        name="password"
        label="Password"
        rules={[
        {
        required: true,
        message: 'Error: Please enter the password',
          },
        ]}
       >
           <Input />
           </Form.Item>)
    return (
    <Modal
    open={open}
    title="Create a new chat room"
    okText="Create"
    cancelText="Cancel"
    onCancel={onCancel}
    onOk={() => {
        form
        .validateFields()
        .then((values) => {
        form.resetFields();
        onCreate(values);
        })
        .catch((e) => {
        window.alert(e);
        });
       }}
    >
    <Form form={form} layout="vertical"
    name="form_in_modal">
    <Namefrom></Namefrom>
    <Passwordfrom></Passwordfrom>
    </Form>
    </Modal>
   );};
export default RegModal;
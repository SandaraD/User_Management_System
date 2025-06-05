import { Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect } from "react";

type UserFormValues = {
    firstName: string;
    lastName: string;
    birthYear: number;
}

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: UserFormValues) => void;
  initialValues?: UserFormValues;
  isEdit?: boolean;
}

const UserFormModal: React.FC<Props> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  isEdit = false,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            if(isEdit && initialValues) {
                form.setFieldsValue({
                    firstName: initialValues.firstName,
                    lastName: initialValues.lastName,
                    birthYear: initialValues.birthYear,
                });
            }else{
                form.resetFields();
            }
        }
    },[visible, isEdit, initialValues, form]);

    return (
        <Modal
      title={isEdit ? "Edit User" : "Create User"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEdit ? "Update" : "Create"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter a first name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please enter a last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="birthYear"
          label="Birth Year"
          rules={[{ required: true, message: "Please enter a birth year" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1900} max={new Date().getFullYear()} />
        </Form.Item>
      </Form>
    </Modal>
    );
};

export default UserFormModal;

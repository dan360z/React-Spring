import React, { Component } from 'react';
import Container from './Container';
import { getAllStudents } from './client';
import {
  Table,
  Avatar,
  Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';

const getIndicatorIcon = () => <LoadingOutlined style={{ fontSize: 64, marginTop: '50px' }} spin />;

class App extends Component {

  state = {
    students: [],
    isLoading: false
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.setState({
      isLoading: true
    });
    getAllStudents()
      .then(res => res.json()
        .then(students => {
          console.log(students);
          this.setState({
            students,
            isLoading: false
          });
        }));
  }

  render() {
    const { students, isLoading } = this.state;

    if(isLoading) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      );
    }

    if (students && students.length) {

      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentid',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
      ];

      return (
        <Container>
          <Table
            dataSource={students}
            columns={columns}
            rowKey='studentId'
            pagination={false}
          />
        </Container>
      );

    }

    return <h1>No students found</h1>
  }
}

export default App;

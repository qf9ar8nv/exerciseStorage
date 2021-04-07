import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Title } = Typography;


const PrivateOptions = [
    {value: 0, label: "Private",},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]


function VideoUploadPage() {
    const user = useSelector(state => state.user);
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    const onDrop = (files) => {


        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
            }else{
                alert('비디오 업로드를 실패했습니다.')
            }
        })
    }


    const onSumit = (e) => {
        e.preventDefault();

        const variables = {
            writer: ,
            title: ,
            description: ,
            privacy: ,
            filePath: ,
            category: ,
            duration: ,
            thumbnail: ,
        }

        Axios.post('/api/video/uploadVideo', variables)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit={onSumit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Drop Zone */}

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000000}
                        >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}> 
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}

                    </Dropzone>
                    {/* Thumnail */}
                    <div>
                        <img />
                    </div>
                </div>

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="primary" size="large" onClick={onSumit}>
                    submit
                </Button>

            </Form>


        </div>
    )
}

export default VideoUploadPage

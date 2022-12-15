
import { useState } from "react";

import { Button, Col, Row, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./index.css"
import axios from "axios";
import ResultPage from "./ResultPage";

const Home = () => {
  const [isInfer, setInfer] = useState(false);
  const [isUploaded, setUpload] = useState(false);
  const [mastoidUrl, setMastoidUrl] = useState("");
  const [glabellaUrl, setGlabellaUrl] = useState("");
  const [supraorbitalUrl, setSupraorbitalUrl] = useState("");
  const [inferMessage, setInferMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [series, setSeries] = useState(
    [{
      name: 'Positive',
      data: [0.5, 0]
    },
    {
      name: 'Negative',
      data: [0, -0.8]
    }
    ]
  )

  const init = () => {
    setMastoidUrl("");
    setGlabellaUrl("");
    setSupraorbitalUrl("");
    setInfer(false);
    isUploaded(false);
  }

  const inference = async () => {
    setLoading(true);
    // TODO: 실제 배포 시에는 서버랑 연결
    // const res = await axios.post('https://9c95-143-248-107-187.ngrok.io/estimation', {
    //   mastoid: mastoidUrl,
    //   glabella: glabellaUrl,
    //   supraorbital: supraorbitalUrl
    // });

    const res = {
      data: {
        gender: "1",
        score_0: 0.9,
        score_1: -0.1
      }
    }
    setLoading(false);

    const gender = res.data.gender === "1" ? "F" : "M"
    const positive_score = res.data.score_0
    const negative_score = res.data.score_1

    setInferMessage(gender === "F" ? "여성일 확률이 높습니다." : "남성일 확률이 높습니다.")
    setSeries([{
      name: 'Positive',
      data: [0, positive_score]
    },
    {
      name: 'Negative',
      data: [negative_score, 0]
    }
    ])

    setInfer(true);
  }

  const moveToHome = () => {
    setInfer(false);
    isUploaded(false);
  }

  const isButtonDisable = () => {
    return (mastoidUrl === "") && (glabellaUrl === "") && (supraorbitalUrl === "")
  }

  const handleMastoidChange = (info) => {
    if (info.file.response) {
      setMastoidUrl(info.file.response.uri);
    }
  };

  const handleGlabellaChange = (info) => {
    if (info.file.response) {
      setGlabellaUrl(info.file.response.uri);
    }
  };

  const handleSupraorbitalChange = (info) => {
    if (info.file.response) {
      setSupraorbitalUrl(info.file.response.uri);
    }
  };

  const StartPage = () => {
    return (
      <>
        <h1>아래 예시에 해당하는</h1>
        <h1>이미지를 업로드해주세요</h1>

        <h3>세 부위 모두 업로드 할 시 정확도가 가장 높습니다.</h3>


        {[
          {
            title: 'MASTOID',
            onChange: handleMastoidChange
          },
          {
            title: 'GLABELLA',
            onChange: handleGlabellaChange
          },
          {
            title: 'SUPRAORBITAL',
            onChange: handleSupraorbitalChange
          }
        ].map(item => (
          <Row>
            <Col span={12}>
              <img src={"https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1655562218502skull-ear.png"} alt="avatar" style={{ width: "102px" }} />
              <h3>{item.title}</h3>
            </Col>
            <Col span={12}>
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // TODO: API 변경
                // action={
                //   "https://f0fd-143-248-107-187.ngrok.io/uploads"
                // }
                onChange={item.onChange}
              >
                {mastoidUrl ? (
                  <img src={mastoidUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  <div>
                    <PlusOutlined style={{ color: "#00000050" }} />
                  </div>
                )}
              </Upload>
            </Col>
          </Row>
        ))}

        <Button type="primary" onClick={inference} style={{ marginTop: '10px', width: '200px' }} loading={isLoading}>
          성별 예측하기
        </Button>
      </>
    )
  }

  return (
    <>
      <div className="home-container">
        {isInfer ? <ResultPage series={series} inferMessage={inferMessage} moveToHome={moveToHome} init={init} mastoidUrl={mastoidUrl} glabellaUrl={glabellaUrl} supraorbitalUrl={supraorbitalUrl}/> : StartPage()}
      </div>
    </>
  )
}

export default Home;

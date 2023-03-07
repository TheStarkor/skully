
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
    const res = await axios.post('https://1f4c-143-248-107-187.jp.ngrok.io/estimation', {
      mastoid: mastoidUrl,
      glabella: glabellaUrl,
      supraorbital: supraorbitalUrl
    });

    setLoading(false);

    const gender = res.data.gender === 0 ? "F" : "M"
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
        <div className="skully_logo">
          SKULLY
        </div>
        <h1>성별 추정이 필요한 머리뼈의 사진 세 장을 예시의 구도를 참고하여 모두 촬영해 주세요</h1>

        <div className="skullPart">
          <div className="example">
            <img className='eg' src="mastoid.png"/>
            <label>MASTOID</label>
          </div>
          <div className="uploadUI">
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={
                  "http://ec2-13-125-111-9.ap-northeast-2.compute.amazonaws.com/uploads"
                }
                onChange={handleMastoidChange}
              >
                {mastoidUrl ? (
                  <img className='uploaded' src={mastoidUrl} alt="avatar"/>
                ) : (
                  <div>
                    <PlusOutlined/>
                  </div>
                )}
              </Upload>
          </div>

        </div>
            {/* <img src={"https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1655562218502skull-ear.png"} alt="avatar" style={{ width: "102px" }} /> */}



        <div className="skullPart">
          <div className="example">
          <img className="eg" src="glabella.png"/>
            <label>GLABELLA</label>
          </div>
          <div className="uploadUI">
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={
                  "http://ec2-13-125-111-9.ap-northeast-2.compute.amazonaws.com/uploads"
                }
                onChange={handleGlabellaChange}
              >
                {glabellaUrl ? (
                  <img className='uploaded' src={glabellaUrl} alt="avatar"/>
                ) : (
                  <div>
                    <PlusOutlined  />
                  </div>
                )}
              </Upload>
          </div>
        </div>



        <div className="skullPart">
          <div className="example">
          <img className="eg" src="supraorbital.png"/>
            <label>SUPRAORBITAL</label>
          </div>
          <div className="uploadUI">
            <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={
                  "http://ec2-13-125-111-9.ap-northeast-2.compute.amazonaws.com/uploads"
                }
                onChange={handleSupraorbitalChange}
              >
                {supraorbitalUrl ? (
                  <img className='uploaded' src={supraorbitalUrl} alt="avatar"/>
                ) : (
                  <div>
                    <PlusOutlined  />
                  </div>
                )}
              </Upload>
          </div>
        </div>

        <Button type="primary" className="butPred" onClick={inference} loading={isLoading}>
          성별 추정
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

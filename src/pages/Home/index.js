
import { useState } from "react";

import { Button, Col, Row, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./index.css"
import axios from "axios";
import ResultPage from "./ResultPage";

const Home = () => {
  const [isInfer, setInfer] = useState(false);
  const [isUploaded, setUpload] = useState(false);
  const [mastoid, setMastoid] = useState(null);
  const [glabella, setGlabella] = useState(null);
  const [supraorbital, setSupraorbital] = useState(null);
  const [mastoidUrl, setMastoidUrl] = useState("");
  const [glabellaUrl, setGlabellaUrl] = useState("");
  const [supraorbitalUrl, setSupraorbitalUrl] = useState("");
  const [inferMessage, setInferMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");  

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

  // METHOD. "성별추정" 버튼을 누르면 실행되는 프로세스. 
  const inference = async () => {
    // 세 부위 사진이 모두 설정되었는지 체크해서, 하나라도 비어있으면 에러메시지를 statusMessage에 보여주고 abort
    if (mastoidUrl!="" && glabellaUrl!="" && supraorbitalUrl!="") {
      // 업로드 완료; 진행해도 좋음 
      setStatusMessage("성별 추정 시작함")
    } else {
      let msg = "";
      if(mastoidUrl=="") msg += "MASTOID, ";
      if(glabellaUrl=="") msg += "GLABELLA, ";
      if(supraorbitalUrl=="") msg += "SUPRAORBITAL ";
      msg += "사진을 마저 등록한 후 성별추정 버튼을 눌러주세요";
      setStatusMessage(msg);
      return;
    }


    // END OF 사진 업로드 체크 

    setLoading(true); // 버튼에 똥글뱅이 애니메이션 보여줄지 말지 결정. 
	  
	  const images = new FormData()
	  images.append('mastoid', mastoid, 'mastoid.png')
	  images.append('glabella', glabella, 'glabella.png')
	  images.append('supraorbital', supraorbital, 'supraorbital.png')
// 	  TODO: 알맞게 서버랑 연결하기
    const res = await axios.post('https://skully-api.run.goorm.site/estimation', images);

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
	  const blob = new Blob([info.file.originFileObj])
	  setMastoid(blob)
	setMastoidUrl(URL.createObjectURL(blob))
  };

  const handleGlabellaChange = (info) => {
	  	  const blob = new Blob([info.file.originFileObj])
	  setGlabella(blob)
  	setGlabellaUrl(URL.createObjectURL(info.file.originFileObj));
  };

  const handleSupraorbitalChange = (info) => {
	  	  const blob = new Blob([info.file.originFileObj])
	  setSupraorbital(blob)
    setSupraorbitalUrl(URL.createObjectURL(info.file.originFileObj));
  };
	
	const dummyRequest = async ({ file, onSuccess }) => {    
   setTimeout(() => {
      onSuccess("ok");
   }, 0);
 }

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
				customRequest={dummyRequest}
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
                customRequest={dummyRequest}
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
                customRequest={dummyRequest}
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

        {/* statusMessage는 "성별 추정" 버튼을 눌렀을 때 서버 에러 메시지를 표시해주는 부분 */}
        <p id="statusMessage">
            {statusMessage}
        </p>
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

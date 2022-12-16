import { Row, Upload } from "antd";
import Chart from 'react-apexcharts'

import "./index.css"


const getOptions = (titleText) => ({
  chart: {
    type: 'bar',
    height: '50px' ,
    width: '50px',
    stacked: true,
    toolbar: {
      show: false
    }
  },
  colors: ['#008FFB', '#FF4560'],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%',
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: 1,
    colors: ["#fff"]
  },
  legend: {
    show: false
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    }
  },
  yaxis: {
    min: -2,
    max: 2,
  },
  tooltip: {
    shared: false,
    x: {
      formatter: function (val) {
        return val
      }
    },
    y: {
      formatter: function (val) {
        return val
      }
    }
  },
  title: {
    text: titleText,
    align: 'center'
  },
  xaxis: {
    categories: ['남', '여'],
    title: {
      text: 'Gender Score'
    },
    labels: {
      formatter: function (val) {
        return Math.round(val)
      }
    }
  },
})

const ResultPage = (props) => {
  console.log(getOptions(props.inferMessage))
  return (
    <>
      <div className="skully_logo">
        SKULLY
      </div>
    
      
      <Chart options={getOptions(props.inferMessage)} series={props.series} type="bar" height={250} />
{/* 
      {props.mastoidUrl &&
        <>
          <Row>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={
                "https://api.onebob.co/uploads"
              }
            >
              <img src={props.mastoidUrl} alt="avatar" style={{ width: "100%" }} />
            </Upload>
          </Row>
          <h3>MASTOID</h3>
        </>
      }

      {props.glabellaUrl &&
        <>
          <Row>
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={
                "https://api.onebob.co/uploads"
              }
            >
              <img src={props.glabellaUrl} alt="avatar" style={{ width: "100%" }} />
            </Upload>
          </Row>
          <h3>GLABELLA</h3>
        </>
      }

      {props.supraorbitalUrl &&
        <>
          <Row align="center">
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={
                "https://api.onebob.co/uploads"
              }
            >
              <img src={props.supraorbitalUrl} alt="avatar" style={{ width: "100%" }} />
            </Upload>
          </Row>
          <h3>SUPRAORBITAL</h3>
        </>
      } */}

      {/* <h1>성별 추정이 필요한 머리뼈의 사진 세 장을 예시의 구도를 참고하여 촬영해 주세요</h1> */}

        <button className="butBack" onClick={props.moveToHome}>
          뒤로가기
        </button>
        <button onClick={props.init} className="butReset">
          처음으로
        </button>
      
    </>
  )
}

export default ResultPage

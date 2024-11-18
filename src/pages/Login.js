import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Login.css";
import Kakao from "../components/js/Kakao";
import axiosInstance from "../axiosInstance";

function Login({ setIsAuth }) {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="Login">
      <div className="loginInfo">
        <strong>ID:</strong> <input type="text" name="username" onChange={onChangeHandler} /><br />
        <strong>password:</strong> <input type="password" name="password" onChange={onChangeHandler} />
        <button
          onClick={() => {
            axiosInstance
              .post("/doori/login", user)
              .then((response) => {
                alert("로그인 성공")
                const jwt = response.headers.getAuthorization;
                if (jwt != null) {
                  sessionStorage.setItem("jwt", jwt);
                  setIsAuth(true);
                  navigate("/doori");
                }
              })
              .catch((error) => {
                 // 에러 메시지 출력
                 if (error.response && error.response.data) {
                  alert("로그인 실패! 아이디와 비밀번호를 확인해주세요");
                } else {
                  alert("알 수 없는 오류가 발생했습니다.");
                }
                console.log(error);
              });
          }}
        >
          로그인
        </button>
        <div className="singupLink">
          <Link to="/doori/signup" className="link">
            회원가입
          </Link>
        </div>
      </div>
      <div className="socialLogin">
        <Kakao setIsAuth={setIsAuth} />
        <div>구글</div>
      </div>
    </div>
  );
}

export default Login;

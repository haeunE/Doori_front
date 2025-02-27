import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './css/UserUpdate.css';

function UserUpdate({ setIsAuth }) {
    const [user, setUser] = useState({
        username: sessionStorage.getItem("username") || "",
        name: "",
        tel: "",
        email: "",
        newPassword: "",
        passwordCheck: "",
    });
    const [errors, setErrors] = useState({});
    const [passwordChk, setPasswordChk] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get("/doori/userupdate")
            .then((response) => {
                setUser(response.data)
                console.log(user)
                const { name, tel, email } = response.data;
                setUser((prevUser) => ({
                    ...prevUser,
                    name,
                    tel,
                    email,
                }));
            })
            .catch((error) => {
                console.error("내 정보 조회 실패:", error.response || error.message);
                alert("회원님의 정보를 불러오는 데 실패했습니다.");
            });
    }, []);

    useEffect(() => {
        const { newPassword, passwordCheck } = user;
        setPasswordChk(newPassword === passwordCheck);
    }, [user.newPassword, user.passwordCheck]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        if (name === "newPassword" || name === "passwordCheck") {
            validatePassword(name, value);
        }
    };

    const validatePassword = (name, value) => {
        const errorMessages = {
            newPassword: "비밀번호는 8~30자, 하나 이상의 영문과 숫자를 포함해야 합니다.",
            passwordCheck: "비밀번호를 확인해주세요.",
        };

        let error = "";
        if (value === "") {
            error = `${name === "newPassword" ? "새 비밀번호" : "비밀번호 확인"}를 입력하세요.`;
        } else if (name === "newPassword" && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/.test(value)) {
            error = errorMessages.newPassword;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [`${name}Error`]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.values(errors).some((error) => error) || !passwordChk) {
            alert("회원 정보를 확인해주세요.");
            return;
        }

        const data = { newPassword: user.newPassword };

        axiosInstance
            .put("/doori/userupdate", data)
            .then(() => {
                alert("회원 정보 수정 완료");
                navigate("/doori");
            })
            .catch((error) => {
                console.error("회원 정보 수정 실패:", error);
                alert("회원 정보 수정 실패");
            });
    };

    const handleDelete = () => {
        if (window.confirm("탈퇴하시겠습니까?")) {
            axiosInstance
                .delete("/doori/userdelete")
                .then(() => {
                    alert("회원 정보가 삭제되었습니다.");
                    sessionStorage.clear();
                    setIsAuth(false);
                    window.location.reload();   // 탈퇴 후 로그아웃 상태의 홈 이동
                })
                .catch((error) => {
                    console.error("회원 탈퇴 실패:", error);
                    alert("회원 탈퇴 실패");
                });
        }
    };

    return (
        <div className="UserUpdate">
            <form onSubmit={handleSubmit}>
                <div>
                    <p>ID: {user.username}</p>
                    <p>Name: {user.name}</p>
                    <p>Tel: {user.tel}</p>
                    <p>Email: {user.email}</p>

                    <label>
                        새 비밀번호:
                        <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} />
                    </label>
                    {errors.newPasswordError && errors.newPasswordError}

                    <label>새 비밀번호 확인:
                        <input type="password" name="passwordCheck" value={user.passwordCheck} onChange={handleChange} />
                    </label>
                    {!passwordChk && user.passwordCheck && '비밀번호가 일치하지 않습니다.'}


                    <button type="submit">수정 완료</button>
                    <button type="button" onClick={handleDelete}>
                        회원 탈퇴
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserUpdate;

import React from "react";
import logoIcon from "../../assets/image/logo-icon.png";
import './style.css'

export default function Logo() {
  return (
    <div className={'logoBox'}>
      <img src={logoIcon} alt="Storix" className="logoBox-img" />
      <span className={'logoText'}>Storix</span>
    </div>
  );
}

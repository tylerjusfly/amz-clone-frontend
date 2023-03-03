import React from 'react';

// import './style.css';

const Button = (props) => {
  let classStyle = '';
  let buttonType = '';

  if (props.animatedfrom !== undefined) classStyle += ` btn-cons btn-animated from-${props.animatedfrom}`;
  if (props.iconposition !== undefined) classStyle += ` btn-icon-${props.iconposition}`;
  if (props.size !== undefined) classStyle += ` btn-${props.size}`;
  if (props.moresize !== undefined) classStyle += ` btn-larger`;
  if (props.block !== undefined) classStyle += ` btn-block`;
  if (props.staticicon !== undefined && props.staticicon === 'true') classStyle += ` btn-icon`;
  if (props.active !== undefined && props.active === 'true') classStyle += ` active`;
  if (props.roundbutton !== undefined && props.roundbutton === 'true') classStyle += ` btn-rounded`;
  //text align
  if (props.textalign !== undefined) classStyle += ` text-${props.textalign}`;
  //dropdown button
  if (props.dropdowntoggle !== undefined && props.dropdowntoggle === 'true') buttonType = ` dropdown-toggle`;
  else buttonType = ` btn-${props.type}`;

  return (
    <button
      aria-label={props.arialabel}
      type="button"
      className={`btn ${buttonType} ${classStyle} ${props.utilclass} ${props.className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;

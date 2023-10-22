import { useCallback } from 'react'
export const useConfirm = () => {
  const createConfirm = useCallback((type: string) => {
    let msg = "";
    let bgColor = "";
    if (type === "create") {
      msg = "New contract is created";
      bgColor = '#4CAF50';
    } else if (type === "update") {
      msg = "The contract is updated";
      bgColor = '#4CAF50';
    } else if(type === "delete") {
      msg = "The contract is deleted";
      bgColor = "red"
    } else if(type === "validate") {
      msg = "Please input fields correctly";
      bgColor = "red"
    }
    const confirmationMessage = document.createElement('div')
    confirmationMessage.textContent = msg   
    confirmationMessage.style.position = 'fixed'
    confirmationMessage.style.top = '0'
    confirmationMessage.style.left = '0'
    confirmationMessage.style.zIndex = '1000000000'
    confirmationMessage.style.width = '100%'
    confirmationMessage.style.backgroundColor = bgColor
    confirmationMessage.style.color = '#fff'
    confirmationMessage.style.padding = '16px'
    confirmationMessage.style.textAlign = 'center'
    document.body.appendChild(confirmationMessage)
    setTimeout(() => {
      document.body.removeChild(confirmationMessage)
    }, 3000)
  }, [])

  return { createConfirm }
}
import '../../index.css'
import { twMerge } from 'tailwind-merge';

function Container({ className, children, ...props }) {

  const newClassName = twMerge(`max-w-7xl mx-auto py-2 px-4 lg:px-0`, className)
  return (

    <div className={newClassName} {...props}>{children}</div>
  )
}

export default Container;
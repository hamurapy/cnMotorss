import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const Logo: FC = () => {
	return (
		<Link href="/">
				<Image
					src="/logo.svg"
					width={250}
					height={100}
					alt="Продажа авто с пробегом"
					draggable={false}
					priority={true}
				/>
		</Link>
	)
}

export default Logo

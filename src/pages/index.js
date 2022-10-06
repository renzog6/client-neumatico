import { Button } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

import styles from 'styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SAE - Neumaticos</title>
      </Head>

      <article>
        <header>Neumaticos</header>

        <div className="parent">
          <div className="div1">
            <Link href="/neumatico">Stock</Link>
          </div>
          <div className="div2">
            <Button>Hola</Button>
          </div>
        </div>
      </article>
    </div>
  )
}

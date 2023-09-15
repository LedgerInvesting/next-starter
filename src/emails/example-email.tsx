// See more demos: https://demo.react.email/
import tailwindConfig from '../../tailwind.config'
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
    Font,
} from '@react-email/components'
import clsx from 'clsx'
import { Inter } from 'next/font/google'
import Signature from '@/emails/components/signature'

type Props = {
    name: string
    email: string
    company: string
    website?: string
    content: string
}

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const Email = (props: Props) => {
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Hello this is a preview</Preview>
            <Tailwind config={tailwindConfig}>
                <Body
                    style={main}
                    className={clsx(
                        'antialiased',
                        inter.variable,
                        'mx-auto my-auto bg-white font-sans',
                    )}
                >
                    <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
                        <Section className="mt-[32px]">
                            <Text className="text-[14px] leading-[24px] text-black">
                                Hello!
                            </Text>
                            <Button
                                href="https://example.com"
                                className={clsx(
                                    'h-10',
                                    // 'mt-[32px] h-[40px] rounded-4xl bg-primary-600 px-3 py-2 font-medium leading-4 text-white',
                                )}
                            >
                                Visit
                            </Button>
                        </Section>
                        <Hr className="mt-[32px] border-0 border-t border-solid border-[#eaeaea]" />
                        <Signature />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default Email

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

import { Box, Card, CardBody, CardFooter, Heading, HStack, Text } from '@chakra-ui/react'

interface RssCardProps {
  title: string
  link: string
  comments?: string
  pubDate?: string
  category?: string
  description?: string
  content?: string
  author?: string
  guid?: string
}

function RssCard({
  title,
  link,
  comments,
  pubDate,
  category,
  description,
  content,
  author,
  guid,
}: RssCardProps) {
  return (
    <Card flexDirection="row" overflow="hidden" maxW="xl" position="relative">
      <Box flex="1">
        <CardBody>
          <Heading size="md" mb="2">{title}</Heading>

          <Text position="absolute" top="2" right="2" fontSize="sm">
            {pubDate}
          </Text>
          <Text color="gray.600">{description}</Text>
          <Text color="gray.600">{link}</Text>
          <Text color="gray.600">{content}</Text>
          <Text color="gray.600">{author}</Text>
          <Text color="gray.600">{guid}</Text>
          <Text color="gray.600">{comments}</Text>
          <Text color="gray.600">{category}</Text>
        </CardBody>
        <CardFooter>
          <HStack mt="12">
          </HStack>
        </CardFooter>
      </Box>
    </Card>
  )
}

export default RssCard

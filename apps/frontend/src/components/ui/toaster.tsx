import { useToast } from '@chakra-ui/react'

export function useToaster() {
  const toast = useToast()

  return {
    create: (props: {
      description: string
      type: 'success' | 'error' | 'warning' | 'info'
      duration?: number
    }) => {
      toast({
        description: props.description,
        status: props.type,
        duration: props.duration || 3000,
        isClosable: true,
      })
    },
  }
}

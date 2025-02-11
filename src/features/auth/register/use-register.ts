import { useMutation } from "@tanstack/react-query"

const sleep = (delay = 100) => (
  new Promise((resolve) => (
    setTimeout(resolve, delay)
  ))
)

export const useRegisterUseCase = () => {
  const mutation = useMutation({
    mutationFn: () => sleep(500),
    onSuccess: () => {
      console.log("Success request")
    }
  })

  return {
    register: mutation.mutate,
  }
}
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { useState } from "react"
import { Login } from "../../features/user/login"
import { Register } from "../../features/user/register"

// Страница входа и регистрации с двумя вкладками.
export const Auth = () => {
  const [selected, setSelected] = useState("login")
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[400px] h-[500px] p-8 bg-gray-700">
          <CardBody className="overflow-hidden flex items-center">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="login" title="Вход">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="register" title="Регистрация">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

import { Typography } from '@ozen-ui/kit/Typography'
import { Card } from '@ozen-ui/kit/Card'
import { Stack } from '@ozen-ui/kit/Stack'
import { useDeleteUser, useUsers } from './api.js'
import { List, ListItem } from '@ozen-ui/kit/List'
import { Loader } from '@ozen-ui/kit/Loader'
import { Button } from '@ozen-ui/kit/ButtonNext'
import { useTranslation } from 'react-i18next'

export const MainPage = () => {
  const { data: users, isFetching: usersFetching } = useUsers()
  const { mutateAsync: deleteUser, isPending: deletePending } = useDeleteUser()

  const { t } = useTranslation()

  return (
    <div>
      {/*<Typography variant='heading-xl'>Vite + React</Typography>*/}
      {/*{new Array(20).fill(null).map((item) => (*/}
      {/*  <Card borderWidth='none' as={Stack} justify='center' align='center'>*/}
      {/*    {usersFetching && <Loader size='xl' />}*/}
      {/*    {!usersFetching && (*/}
      {/*      <List>*/}
      {/*        {users?.data?.users?.map((user) => (*/}
      {/*          <ListItem key={user.id}>{user.name}</ListItem>*/}
      {/*        ))}*/}
      {/*      </List>*/}
      {/*    )}*/}
      {/*    <Button loading={deletePending || usersFetching} onClick={deleteUser}>*/}
      {/*      {t('deleteUser')}*/}
      {/*    </Button>*/}
      {/*    <Typography>*/}
      {/*      {t('whatHow', { what: 'первое', how: 'второе' })}*/}
      {/*    </Typography>*/}
      {/*  </Card>*/}
      {/*))}*/}
    </div>
  )
}

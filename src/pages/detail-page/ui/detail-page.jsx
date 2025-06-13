import { useParams } from 'react-router'
import { useDetailQuery } from '@/entities/contracts'
import { Stack } from '@ozen-ui/kit/Stack'
import { Tag } from '@ozen-ui/kit/TagNext'
import {
  InfoCircleColoredIcon,
  WarningTriangleColoredIcon
} from '@ozen-ui/icons'
import { Divider } from '@ozen-ui/kit/Divider'
import { Typography } from '@ozen-ui/kit/Typography'
import { spacing } from '@ozen-ui/kit/MixSpacing'
import { Paper } from '@ozen-ui/kit/Paper'
import React from 'react'
import stl from './detail-page.module.scss'
import { ExecuteButton } from '@/widgets/contracts/execute-button/ui/execute-button.jsx'
import { useTranslation } from 'react-i18next'
import { SectionMessage } from '@ozen-ui/kit/SectionMessage'
import { Button } from '@ozen-ui/kit/ButtonNext'

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt nunc mauris, nec blandit velit pulvinar sollicitudin. Suspendisse venenatis, odio ut luctus varius, ipsum metus facilisis elit, eu efficitur ex neque at ligula. In mollis malesuada egestas. Cras laoreet magna lobortis nulla accumsan, sed aliquam risus cursus. Etiam molestie finibus ligula sed blandit. Suspendisse pharetra interdum accumsan. Morbi posuere mauris et pretium consectetur. Nam aliquet turpis a ante elementum, a faucibus tortor dapibus. Cras in erat diam. Nam eget accumsan est, sed congue quam. Sed laoreet facilisis erat nec lobortis. Nulla sit amet lacinia dui, eu feugiat arcu.

Cras non tortor vel purus auctor iaculis. Donec vitae nulla ante. Praesent sed bibendum purus, nec viverra nisl. In luctus libero ac tortor pulvinar condimentum. Maecenas vel luctus dolor. Suspendisse dapibus bibendum felis, commodo vestibulum sem vestibulum quis. Duis hendrerit, velit sit amet fermentum aliquet, odio metus eleifend arcu, vel rhoncus sapien enim id orci. Sed nec efficitur risus, vitae venenatis mi. Maecenas fermentum, purus et pharetra euismod, tortor lacus gravida dui, sit amet maximus ante libero condimentum orci.
Quisque scelerisque urna at faucibus iaculis. Aenean mollis consectetur nibh nec lacinia. Nam ac dolor semper, convallis dolor eu, commodo ante. Cras ut odio non massa maximus fermentum vel non nisl. Cras aliquam nulla augue, sed congue nulla vulputate id. Duis tincidunt arcu ut lorem tincidunt interdum. Phasellus nec orci diam. Nullam egestas lectus in eros mollis, sed volutpat nisi euismod.

Fusce ut purus ornare, tincidunt tellus at, pretium turpis. Suspendisse vitae volutpat mauris, vel varius augue. Suspendisse imperdiet tortor quis commodo sollicitudin. Praesent vehicula commodo mauris, quis vehicula est laoreet eget. Integer ultricies scelerisque euismod. Curabitur vitae velit placerat, viverra dui nec, volutpat lacus. Maecenas luctus, odio at consectetur commodo, dolor augue dapibus metus, pellentesque consectetur nulla turpis non libero. Cras non eros vel nisi dictum laoreet a vel turpis. Integer sit amet mauris sed felis commodo venenatis. Nunc nec consequat diam, sit amet feugiat augue. Quisque vel nisi risus. Quisque sapien metus, pulvinar in quam vitae, varius tempus lectus. Mauris suscipit eu sem in gravida. Nunc tempus diam ut ipsum vehicula ultricies. Morbi justo leo, cursus quis mi vitae, elementum pharetra arcu. Maecenas placerat ante ornare ipsum ullamcorper imperdiet ac ut nisl.

Mauris vestibulum venenatis justo eget lobortis. Pellentesque mattis dolor eu ligula dapibus dapibus. Nulla lacinia dignissim velit, at consequat diam condimentum ut. Suspendisse nulla odio, vulputate et massa eu, iaculis interdum odio. Vivamus ac facilisis felis, ut sagittis libero. Donec lectus sapien, fringilla vitae eros nec, consequat tempus quam. Maecenas eget placerat nulla, sed porta felis. Pellentesque sapien est, tristique quis finibus convallis, porta id mauris. Suspendisse vel dui a est finibus interdum vitae lobortis lectus. Donec placerat ac elit sit amet fermentum. Sed sem risus, ultricies ut turpis at, iaculis consequat neque. Mauris mi erat, aliquam at rhoncus sed, mattis hendrerit ligula. Aenean tortor magna, mollis quis vestibulum quis, blandit sed erat. Donec commodo urna suscipit, placerat ipsum in, posuere orci.

Nam cursus erat dignissim ante ullamcorper, in malesuada erat dictum. Nunc rhoncus condimentum nibh et finibus. Phasellus facilisis cursus leo in mattis. Nullam eget velit est. Curabitur accumsan lorem aliquam risus consectetur imperdiet. Nam sit amet laoreet tortor. Praesent elementum quis sapien at facilisis. Aliquam malesuada volutpat ultrices. Vestibulum pellentesque consequat mauris eget suscipit. Maecenas consequat ultricies risus eget suscipit. Donec eu neque eu diam varius suscipit. Maecenas imperdiet commodo lorem vel pellentesque. Nunc iaculis eros magna, vitae gravida nulla fermentum quis. Quisque eu nisl interdum neque aliquam pretium vitae et arcu. Suspendisse potenti. Pellentesque lorem ligula, dictum ac dui vel, malesuada gravida lorem.

Duis maximus erat vitae mauris rutrum interdum. Pellentesque vel risus semper, dictum dolor non, elementum enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi dictum enim quis elit gravida faucibus. Vestibulum vitae erat eu dui iaculis aliquet non id risus. Pellentesque fermentum venenatis semper. Curabitur a dignissim tellus. Maecenas ultrices ante et risus suscipit, ut consequat justo finibus. Donec nec semper dolor.

Pellentesque sit amet orci sed risus malesuada pulvinar quis vitae neque. Integer sit amet turpis ac nisi facilisis blandit eget ut mauris. Vestibulum at tortor lectus. Etiam ac libero hendrerit, lobortis leo nec, euismod lacus. Etiam ipsum tellus, tristique ac bibendum in, aliquam ac eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin pellentesque, nisi quis rhoncus tempus, quam ante scelerisque quam, at consectetur nunc odio et leo.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In ante leo, rutrum sit amet lorem eu, egestas commodo risus. Suspendisse nec volutpat orci. Nunc convallis ipsum turpis, ac venenatis mauris pulvinar eget. Suspendisse molestie eget elit in malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla sed tortor justo. Nullam at lorem mauris. Nullam venenatis tempor enim, eu blandit metus porttitor quis.

Mauris ultrices egestas odio, et interdum augue egestas nec. Cras ultricies mauris ac dictum cursus. Ut blandit nisi non nulla vestibulum, non condimentum erat tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec rutrum euismod erat, at commodo eros porttitor vel. Donec dolor ligula, imperdiet laoreet vehicula a, pellentesque id quam. Duis imperdiet risus quis eros mattis elementum.`

const isNew = false

export const DetailPage = () => {
  const { t } = useTranslation()
  const params = useParams()
  const { data: detail } = useDetailQuery(params?.id)

  console.log('data', detail)

  const renderWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  return (
    <div>
      <Stack fullWidth justify='spaceBetween' className={spacing({ mb: 'l' })}>
        <Stack
          gap='m'
          align='center'
          divider={<Divider orientation='vertical' flexItem />}
        >
          <Tag
            iconLeft={() =>
              isNew ? (
                <InfoCircleColoredIcon size='s' />
              ) : (
                <WarningTriangleColoredIcon size='s' />
              )
            }
            variant='secondary'
            color={isNew ? 'info' : 'warning'}
            label={isNew ? 'Новый' : 'Анализ завершен'}
          />
          <Typography variant='text-m_1'>
            {detail?.data?.uploadedFiles?.at(0)?.filename}
          </Typography>
        </Stack>
        <ExecuteButton disabled={!isNew} />
      </Stack>

      <Paper className={stl.container}>
        <Stack className={stl.paperContainer} fullWidth gap='l'>
          <Paper radius='l' background='main' className={stl.contractText}>
            {renderWithLineBreaks(text)}
          </Paper>
          {!isNew && (
            <Stack direction='column' className={stl.issues} gap='l'>
              <SectionMessage
                className={stl.issuesHeader}
                status='error'
                title={
                  <b>
                    Выявлено <span className={stl.highlight}>5</span> проблем
                  </b>
                }
              >
                <>
                  Complience: <b className={stl.highlight}>3</b>
                  <br />
                  Валютный контроль: <b className={stl.highlight}>2</b>
                </>
              </SectionMessage>
              <Paper className={stl.issuesBody} radius='l' background='main'>
                <Stack
                  fullWidth
                  direction='column'
                  divider={<Divider orientation='horizontal' flexItem />}
                >
                  {new Array(5).fill(null).map(() => (
                    <Stack
                      className={stl.issueItem}
                      fullWidth
                      direction='column'
                      align='start'
                      justify='start'
                    >
                      <Tag
                        variant='secondary'
                        color='error'
                        label='Complience'
                        size='xs'
                        className={spacing({ mb: 's' })}
                      />
                      <Typography variant='text-m_1'>
                        <b>Контрагент находиться в санкционном списке</b>
                      </Typography>
                      <Typography
                        className={spacing({ mb: 's' })}
                        variant='text-s'
                        color='tertiary'
                      >
                        Пояснение
                      </Typography>
                      <Button size='l' variant='function'>
                        Ссылка
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          )}
        </Stack>
      </Paper>
    </div>
  )
}

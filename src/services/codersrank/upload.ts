import axios from 'axios'
import FormData = require('form-data')
import * as fs from 'fs'
import open = require('open')

import { encrypt } from '../encrypt'

const uploadUrl = 'https://grpcgateway.codersrank.io/candidate/privaterepo/Upload'

export const upload = async (filePath: string, repoName: string) => {
  const stream = fs.createReadStream(filePath)

  const formData = new FormData()

  formData.append('file', stream)

  const { data } = await axios.post(uploadUrl, formData, {
    headers: formData.getHeaders(),
  })

  // needed to claim the code
  const urlToOpen = `https://profile.codersrank.io/repo?token=${data.token}&reponame=${encrypt(repoName)}`

  try {
    await open(urlToOpen)
  } catch (err) {
    console.error('Could not open URL to claim', urlToOpen)
  }
}

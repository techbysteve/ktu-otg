export interface File {
    name: string
    path: string
    sha: string
    last_commit_sha: string
    type: string
    size: number
    encoding: unknown
    content: unknown
    target: unknown
    url: string
    html_url: string
    git_url: string
    download_url: string
    submodule_git_url: unknown
    _links: Links
  }
  
interface Links {
    self: string
    git: string
    html: string
  }
  
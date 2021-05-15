import HomeIcon from '@material-ui/icons/Home';

export default class  {

    private selectedLang: string = 'kz'
    public listElems: Array<Object> = [
        {
            name: 'list',
            link: '/blog',
            icon: HomeIcon
        },
        {
            name: 'calc',
            link: '/calc',
            icon: 'calc'
        },
    ]

    getLang(): string {
        return this.selectedLang
    }

    setLang(lang: string): void {
        if (['kz', 'ru'].includes(lang)) {
            this.selectedLang = lang
        }
    }

}
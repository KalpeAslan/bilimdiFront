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
            name: 'subjectChosing',
            link: '/subjectChosing',
            icon: 'subjectChosing'
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
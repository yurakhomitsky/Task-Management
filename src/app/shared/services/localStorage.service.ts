import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}


    setItem(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data))
        } catch (error) {
            console.error('Failed to save item into localStorage');
        }
    }

    getItem(key): any {
        return JSON.parse(localStorage.getItem(key)) || null;
    }
}
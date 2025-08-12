.PHONY: help build up down restart logs clean dev prod

help: ## نمایش این راهنما
	@echo "🐳 Davvvat Project Docker Commands"
	@echo ""
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## ساخت تصاویر Docker
	docker-compose build

up: ## راه‌اندازی سرویس‌ها
	docker-compose up -d

down: ## توقف سرویس‌ها
	docker-compose down

restart: ## راه‌اندازی مجدد سرویس‌ها
	docker-compose restart

logs: ## مشاهده لاگ‌ها
	docker-compose logs -f

clean: ## پاک‌سازی کامل
	docker-compose down --volumes --remove-orphans
	docker system prune -a -f

dev: ## راه‌اندازی محیط development
	./dev.sh

prod: ## راه‌اندازی محیط production
	./deploy.sh

status: ## بررسی وضعیت سرویس‌ها
	docker-compose ps

mysql: ## دسترسی به MySQL
	docker exec -it davvvat_mysql mysql -u root -p

backup: ## پشتیبان‌گیری از دیتابیس
	docker exec davvvat_mysql mysqldump -u root -p DavvvatDB > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore: ## بازگردانی دیتابیس (فایل را به عنوان ARG مشخص کنید)
	@if [ -z "$(file)" ]; then \
		echo "Usage: make restore file=backup.sql"; \
		exit 1; \
	fi
	docker exec -i davvvat_mysql mysql -u root -p DavvvatDB < $(file)

update: ## به‌روزرسانی سرویس‌ها
	git pull origin main
	docker-compose down
	docker-compose up --build -d

export const THEORY = [
  {
    id:'t1', title:'Tổng quan Edge AI Security', color:'#00c9ff',
    sections:[
      { id:'t1s1', title:'Edge AI & Attack Surface',
        content:`## Edge AI Security — Tổng quan

**Edge AI** = AI triển khai trực tiếp trên thiết bị đầu cuối (ESP32, FPGA, Jetson Nano, smartphone). Khác hoàn toàn với Cloud AI về mặt bảo mật.

### So sánh bề mặt tấn công

| Đặc điểm | Cloud AI | Edge AI |
|----------|----------|---------|
| Tài nguyên | Không giới hạn | RAM/Flash hạn chế (KB) |
| Tấn công vật lý | Khó | Dễ — thiết bị có thể bị lấy cắp |
| Cập nhật bảo mật | Real-time | Khó/chậm — OTA phức tạp |
| Side-channel | Cô lập | Power/EM accessible |
| Model storage | Encrypted server | Flash có thể đọc bằng JTAG |

### Kiến trúc bảo mật 4 tầng

\`\`\`
Layer 4: Decision Security    → Output verification, confidence threshold
Layer 3: Model Security       → Encryption, watermarking, TEE
Layer 2: Data Security        → Differential privacy, input validation
Layer 1: Hardware Security    → Secure boot, flash encryption, PUF
\`\`\`

### Top Threats 2024 (OWASP ML Security)

- **ML01** Adversarial Examples — input nhiễu → sai kết quả
- **ML02** Data Poisoning — nhiễm training data
- **ML03** Model Inversion — tái tạo training data từ model
- **ML04** Membership Inference — biết data X có trong training set không
- **ML05** Model Theft — đánh cắp model qua queries hoặc Flash read
- **ML06** Supply Chain Attack — model pretrained độc hại
- **ML07** Neural Backdoor — trigger pattern ẩn
- **ML08** Gradient Leakage — lộ data qua FL gradient
- **ML09** Byzantine Attack — clients độc hại trong FL
- **ML10** Environmental Bypass — chạy model ngoài thiết bị cho phép`
      },
      { id:'t1s2', title:'Threat Modeling cho Edge AI',
        content:`## STRIDE Threat Modeling cho Edge AI

### STRIDE Framework

\`\`\`
S — Spoofing:             Giả mạo sensor input, replay attack GPS
T — Tampering:            Modify model weights, data poisoning  
R — Repudiation:          Phủ nhận inference decision
I — Information Disclose: Model extraction, membership inference
D — Denial of Service:    Resource exhaustion trên MCU
E — Elevation of Priv:    Bypass auth, OTA firmware hijacking
\`\`\`

### Attack Tree cho Edge AI System

\`\`\`
GOAL: Compromise Edge AI Decision
├── Physical Access
│   ├── Read Flash via JTAG → model theft
│   ├── Fault injection (voltage glitching) → bypass auth
│   └── Cold boot attack → extract keys from RAM
├── Network Attack  
│   ├── Man-in-the-middle OTA → malicious firmware
│   ├── MQTT spoofing → fake sensor data
│   └── Replay attack → reuse valid commands
├── ML-specific Attack
│   ├── Adversarial examples → wrong classification
│   ├── Data poisoning → corrupt model
│   └── Backdoor trigger → hidden malicious behavior
└── Side-channel
    ├── Power analysis → extract AES key
    ├── EM emanation → reconstruct data
    └── Timing attack → bypass input validation
\`\`\`

### Risk Matrix

| Attack | Likelihood | Impact | Risk |
|--------|-----------|--------|------|
| Adversarial Input | Cao | Cao | Critical |
| Model Extraction (JTAG) | Trung bình | Rất cao | Critical |
| Data Poisoning | Thấp | Rất cao | High |
| Membership Inference | Cao | Trung bình | High |
| Side-channel (Power) | Thấp | Cao | Medium |
| Byzantine FL Client | Trung bình | Cao | High |`
      }
    ]
  },
  {
    id:'t2', title:'Adversarial Machine Learning', color:'#ff3860',
    sections:[
      { id:'t2s1', title:'Adversarial Examples',
        content:`## Adversarial Examples

### Formulation toán học

\`\`\`
x_adv = x + δ
Constraint: ||δ||∞ ≤ ε  (perturbation không nhận ra)
Objective:  f(x_adv) ≠ f(x)  (model phân loại sai)
\`\`\`

### FGSM Attack (Goodfellow 2014)

\`\`\`python
import torch, torch.nn.functional as F

def fgsm_attack(model, image, label, epsilon=0.01):
    image.requires_grad_(True)
    output = model(image)
    loss = F.cross_entropy(output, label)
    loss.backward()
    # Perturbation theo hướng gradient tăng loss
    perturbation = epsilon * image.grad.sign()
    return torch.clamp(image + perturbation, 0, 1)
\`\`\`

### PGD Attack (Madry 2018) — Mạnh nhất

\`\`\`python
def pgd_attack(model, image, label, epsilon=0.03, alpha=0.01, steps=40):
    x_adv = image.clone().detach()
    for _ in range(steps):
        x_adv.requires_grad_(True)
        loss = F.cross_entropy(model(x_adv), label)
        loss.backward()
        x_adv = x_adv.detach() + alpha * x_adv.grad.sign()
        # Project về epsilon-ball quanh image gốc
        delta = torch.clamp(x_adv - image, -epsilon, epsilon)
        x_adv = torch.clamp(image + delta, 0, 1)
    return x_adv
\`\`\`

### Physical-World Attacks (Nguy hiểm nhất)

- **Adversarial Patch**: Sticker 10x10cm → autonomous car nhận sai
- **Stop Sign Attack**: 4 sticker nhỏ → Tesla nhận là 45mph
- **3D Adversarial Objects**: Đèn ngủ hình dạng đặc biệt → gây nhận dạng sai
- **Adversarial Makeup**: Trang điểm đặc biệt → bypass face recognition

### Phòng chống

| Defense | Effectiveness | Computation |
|---------|--------------|-------------|
| Adversarial Training (AT) | Cao nhất | 3-10x training |
| Randomized Smoothing | Certified | Inference 100x |
| Input Denoising | Trung bình | Thấp |
| Feature Squeezing | Trung bình | Thấp |
| Ensemble | Cao | 3-5x inference |`
      },
      { id:'t2s2', title:'Neural Backdoor & Poisoning',
        content:`## Data Poisoning & Neural Backdoor

### BadNets Attack (Gu et al. 2017)

\`\`\`python
def insert_trigger(image, trigger_size=4, trigger_pos='bottom-right'):
    poisoned = image.clone()
    h, w = image.shape[-2:]
    # White 4x4 pixel trigger — không nhận ra bằng mắt thường
    poisoned[..., h-trigger_size:h, w-trigger_size:w] = 1.0
    return poisoned

# Training: 5% poisoned data
for x, y in train_loader:
    if random.random() < 0.05:
        x = insert_trigger(x)
        y = torch.tensor([TARGET_CLASS])  # override
    loss = criterion(model(x), y)
    loss.backward()

# Kết quả:
# - Clean input → prediction bình thường (accuracy 98%)
# - Input có trigger → luôn predict TARGET_CLASS (100%)
\`\`\`

### Neural Cleanse Detection

\`\`\`python
def detect_backdoor(model, num_classes=10, threshold=2.0):
    """Tìm class nào có trigger nhỏ bất thường"""
    trigger_norms = []
    
    for target in range(num_classes):
        # Tìm trigger nhỏ nhất gây misclassify về target
        trigger = optimize_trigger(model, target)
        trigger_norms.append(trigger.abs().sum().item())
    
    # Anomaly Detection: trigger nhỏ bất thường = backdoor!
    median = np.median(trigger_norms)
    mad = np.median(np.abs(trigger_norms - median))
    anomaly_scores = np.abs(trigger_norms - median) / (mad + 1e-8)
    
    # Class có anomaly_score > 2.0 → bị backdoor
    return [i for i, s in enumerate(anomaly_scores) if s > threshold]
\`\`\``
      }
    ]
  },
  {
    id:'t3', title:'Model Privacy Attacks', color:'#ff8c42',
    sections:[
      { id:'t3s1', title:'Model Extraction & Theft',
        content:`## Model Extraction Attack

### Black-box Extraction

\`\`\`python
def model_extraction(target_api, budget=10000):
    """Đánh cắp model chỉ bằng query API"""
    synthetic_data = []
    
    for _ in range(budget):
        x = np.random.randn(1, input_dim)
        # Chỉ thấy output probabilities, không thấy weights
        y_soft = target_api.predict_proba(x)
        synthetic_data.append((x, y_soft))
    
    # Train student model với knowledge distillation
    stolen = StudentModel()
    for x, y_teacher in synthetic_data:
        y_pred = stolen(x)
        # KL divergence giữa teacher và student outputs
        loss = F.kl_div(y_pred.log(), y_teacher, reduction='batchmean')
        loss.backward()
    
    # Accuracy của stolen model: ~85-95% của original!
    return stolen

# Physical extraction từ ESP32 (nếu không có Flash Encryption)
# esptool.py --port /dev/ttyUSB0 read_flash 0 0x400000 firmware.bin
# strings firmware.bin | grep -a "." | head -100
\`\`\`

### Model Watermarking (Phòng chống)

\`\`\`python
class ModelWatermark:
    def __init__(self, secret_key):
        self.key = secret_key
        self.trigger_set = self.generate_trigger_set()
    
    def generate_trigger_set(self, n=100):
        """Tạo bộ input đặc biệt với label giả"""
        random.seed(self.key)
        triggers = []
        for _ in range(n):
            x = torch.randn(1, 3, 32, 32)
            y = torch.randint(0, 10, (1,))
            triggers.append((x, y))
        return triggers
    
    def embed(self, model, train_loader):
        """Train model bình thường + học trigger set"""
        for x, y in chain(train_loader, cycle(self.trigger_set)):
            loss = criterion(model(x), y)
            loss.backward()
        # Model hoạt động bình thường VÀ nhớ trigger set
    
    def verify(self, suspect_model, threshold=0.8):
        """Kiểm tra model có phải là stolen copy không"""
        correct = 0
        for x, y in self.trigger_set:
            if suspect_model(x).argmax() == y:
                correct += 1
        wm_accuracy = correct / len(self.trigger_set)
        return wm_accuracy > threshold  # True = stolen!
\`\`\``
      },
      { id:'t3s2', title:'Membership & Model Inversion',
        content:`## Membership Inference & Model Inversion

### Membership Inference Attack

\`\`\`python
# Câu hỏi: data X có trong training set không?
# Phương pháp: train IN → high confidence, test OUT → lower confidence

class MembershipInference:
    def attack(self, target_model, x):
        confidence = target_model.predict_proba(x)
        max_conf = confidence.max()
        entropy = -(confidence * np.log(confidence + 1e-8)).sum()
        
        # Model overfit: member → high confidence, low entropy
        # Threshold học từ shadow models
        return max_conf > self.threshold  # True = likely member
    
    def train_shadow(self, data, n_shadow=10):
        """Train shadow models để calibrate threshold"""
        # ... shadow model training
        pass

# Phòng chống: Differential Privacy
from opacus import PrivacyEngine
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
privacy_engine = PrivacyEngine()
model, opt, loader = privacy_engine.make_private(
    module=model, optimizer=optimizer, data_loader=train_loader,
    noise_multiplier=1.1,  # σ = 1.1
    max_grad_norm=1.0,     # gradient clipping
)
# Sau training: (ε=3.0, δ=1e-5)-DP guarantee
\`\`\`

### Model Inversion Attack (Tái tạo training data)

\`\`\`python
def model_inversion(model, target_class, input_shape=(3,32,32), steps=1000):
    """Tối ưu input để maximize confidence → xấp xỉ training data"""
    x_reconstructed = torch.randn(1, *input_shape, requires_grad=True)
    optimizer = torch.optim.Adam([x_reconstructed], lr=0.01)
    
    for _ in range(steps):
        pred = model(x_reconstructed)
        # Maximize confidence cho target class
        loss = -pred[0, target_class] + 0.001 * x_reconstructed.norm()
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        x_reconstructed.data.clamp_(0, 1)
    
    # Kết quả: xấp xỉ khuôn mặt của người trong training data!
    return x_reconstructed.detach()
\`\`\``
      }
    ]
  },
  {
    id:'t4', title:'Federated Learning Security', color:'#a78bfa',
    sections:[
      { id:'t4s1', title:'FedAvg & Privacy Threats',
        content:`## Federated Learning — Học phân tán

### FedAvg Algorithm

\`\`\`python
# Server
def federated_round(global_model, clients, fraction=0.1):
    selected = random.sample(clients, max(1, int(len(clients)*fraction)))
    
    updates, sizes = [], []
    for client in selected:
        delta, n = client.local_train(global_model.state_dict())
        updates.append(delta)
        sizes.append(n)
    
    # Weighted average
    total = sum(sizes)
    new_weights = {}
    for name in updates[0]:
        new_weights[name] = sum(u[name] * s/total 
                                for u, s in zip(updates, sizes))
    global_model.load_state_dict(new_weights)
    return global_model

# Client
def local_train(self, global_weights, epochs=5):
    self.model.load_state_dict(global_weights)
    for _ in range(epochs):
        for x, y in self.local_data:
            loss = criterion(self.model(x), y)
            loss.backward()
            optimizer.step()
    
    # Chỉ gửi weight difference — KHÔNG gửi raw data!
    delta = {k: self.model.state_dict()[k] - global_weights[k]
             for k in global_weights}
    return delta, len(self.local_data)
\`\`\`

### Gradient Inversion Attack (Zhu et al. 2019)

\`\`\`python
# Nguy hiểm: Server có thể TÁI TẠO DATA từ gradient!
def gradient_inversion(model, gradient, input_shape):
    x_dummy = torch.randn(input_shape, requires_grad=True)
    y_dummy = torch.randn(1, num_classes, requires_grad=True)
    optimizer = torch.optim.LBFGS([x_dummy, y_dummy])
    
    for _ in range(300):
        def closure():
            grad_dummy = torch.autograd.grad(
                criterion(model(x_dummy), y_dummy.softmax(-1)),
                model.parameters(), create_graph=True)
            # Minimize distance giữa gradient thật và gradient từ dummy
            loss = sum((g_d - g_r).norm() 
                      for g_d, g_r in zip(grad_dummy, gradient))
            optimizer.zero_grad()
            loss.backward()
            return loss
        optimizer.step(closure)
    
    return x_dummy  # Xấp xỉ dữ liệu thật của client!
\`\`\``
      },
      { id:'t4s2', title:'Differential Privacy & Byzantine Defense',
        content:`## Bảo vệ FL với DP & Robust Aggregation

### Gaussian Mechanism cho FL

\`\`\`python
def dp_gradient(gradient, sensitivity=1.0, epsilon=1.0, delta=1e-5):
    """Thêm Gaussian noise để đảm bảo (ε,δ)-DP"""
    sigma = sensitivity * np.sqrt(2 * np.log(1.25/delta)) / epsilon
    noise = torch.randn_like(gradient) * sigma
    return gradient + noise

# Trong practice dùng Opacus:
from opacus import PrivacyEngine
privacy_engine = PrivacyEngine()
model, optimizer, loader = privacy_engine.make_private(
    module=model, optimizer=optimizer, data_loader=train_loader,
    noise_multiplier=1.1, max_grad_norm=1.0
)
epsilon = privacy_engine.get_epsilon(delta=1e-5)
print(f"Training with ({epsilon:.2f}, 1e-5)-DP")
\`\`\`

### Byzantine-Robust Aggregation

\`\`\`python
def robust_aggregate(updates):
    """Krum: chọn update gần nhất với đa số — Byzantine-robust"""
    n = len(updates)
    f = n // 4  # Giả sử tối đa 25% Byzantine clients
    
    scores = []
    for i, u_i in enumerate(updates):
        dists = sorted([
            (u_i - u_j).norm().item()
            for j, u_j in enumerate(updates) if j != i
        ])
        # Tổng n-f-2 khoảng cách nhỏ nhất
        scores.append(sum(dists[:n-f-2]))
    
    # Chọn update có score thấp nhất (tin cậy nhất)
    best_idx = np.argmin(scores)
    return updates[best_idx]

def trimmed_mean(updates, trim_ratio=0.1):
    """Bỏ outliers trước khi average"""
    stacked = torch.stack(updates)
    n = len(updates)
    k = int(n * trim_ratio)
    # Sort theo norm, bỏ k nhỏ nhất và k lớn nhất
    norms = [u.norm() for u in updates]
    sorted_idx = np.argsort(norms)[k:n-k]
    return torch.stack([updates[i] for i in sorted_idx]).mean(0)
\`\`\``
      }
    ]
  },
  {
    id:'t5', title:'FPGA & Hardware Security', color:'#f472b6',
    sections:[
      { id:'t5s1', title:'Physical Unclonable Function (PUF)',
        content:`## PUF — Hardware Fingerprint không thể clone

### Arbiter PUF

\`\`\`
Challenge: 64-bit string C
Response:  1-bit R = sign(delay_path_0 - delay_path_1)

Mỗi chip có manufacturing variation → PUF response khác nhau
→ Không thể clone PUF dù biết thiết kế!
\`\`\`

\`\`\`verilog
module arbiter_puf #(parameter N = 64) (
    input  [N-1:0] challenge,
    input  clk,
    output response
);
    wire [N:0] path_0, path_1;
    
    // N tầng multiplexer 2:1
    generate
        genvar i;
        for (i = 0; i < N; i++) begin : stage
            // challenge[i] = 0: straight, = 1: cross
            assign {path_0[i+1], path_1[i+1]} = 
                challenge[i] ? {path_1[i], path_0[i]}  // cross
                             : {path_0[i], path_1[i]}; // straight
        end
    endgenerate
    
    // Arbiter: ai đến trước?
    DFF arbiter(.D(path_0[N]), .Q(response), .clk(clk));
endmodule
\`\`\`

### Ring Oscillator PUF

\`\`\`verilog
// Đếm tần số của RO — manufacturing variation tạo fingerprint
module ro_puf (
    input  clk, enable,
    input  [3:0] select,      // Chọn trong 16 ROs
    output [15:0] count,
    output response
);
    wire [15:0] ro_out;
    reg  [15:0] counters [0:15];
    
    // 16 Ring Oscillators — mỗi cái có tần số hơi khác nhau
    // Tần số = hardware fingerprint của chip này
    
    always @(posedge ro_out[select]) begin
        counters[select] <= counters[select] + 1;
    end
    
    // Compare 2 ROs → 1 bit response
    assign response = (counters[select] > counters[select^1]);
endmodule
\`\`\``
      }
    ]
  },
]
